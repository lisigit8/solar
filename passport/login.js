var LocalStrategy = require('passport-local').Strategy;
var mongojs = require('mongojs');
var config = global.config;
var databaseUrl = config.database.solarpulse.live_DB;
var _ = require("underscore");
var async = require("async");
var winston = require('winston');
var moment = require('moment');
var db = mongojs(databaseUrl, ['users', 'userSiteMap', 'features']);
var path = require('path');
//var bCrypt = require('bcrypt-nodejs');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            level: 'info', // Only write logs of info level or higher
            colorize: true
        }),
        new winston.transports.File({
            level: 'warn', // Only write logs of warn level or higher
            filename: path.resolve("logs/" + "login_" + moment().format("YYYY-MM-DD") + ".log"),
            'timestamp': function () {
                return moment().local().format("YYYY-MM-DDTHH:mm:ss Z").toString();
            },
            maxsize: 1024 * 1024 * 50 // 50MB
        })
    ]
});

var dbFeaturesArray = [];
var siteMapArray = [];

function getFeatures(feature, fcb) {
    if (feature.id && feature.name !== "") {
        var keys = Object.keys(feature);
        var featureObject = _.find(dbFeaturesArray, function (val) {
            if (val._id.toString() === feature.id.toString()) {
                return val;
            }
        });
        if (featureObject !== null || featureObject !== undefined) {
            try {
                if (featureObject.type === "primary") {
                    if (_.contains(keys, 'secondarymenu')) {
                        featureObject.secondarymenu = {goTo: "", features: []};
                        async.eachSeries(feature.secondarymenu || [], function (menuItem, mCb) {
                            var resultObject = _.find(dbFeaturesArray, function (val) {
                                if (val._id.toString() === menuItem.id.toString()) {
                                    return val;
                                }
                            });
                            if (resultObject) {
                                featureObject.secondarymenu.goTo = resultObject.goTo;
                                featureObject.secondarymenu.features.push(resultObject);
                                mCb(null);
                            } else {
                                mCb(null);
                            }
                        }, function () {
                            fcb(featureObject);
                        });
                    } else {
                        fcb(featureObject);
                    }
                } else {
                    fcb("error");
                }
            } catch (err) {
                logger.error(err);
                fcb("error");
            }
        } else {
            fcb("error");
        }
    } else {
        fcb("error");
    }
}

function getUserFeatures(featuresId, cb) {
    try {
        var features = [];
        var siteMap;
        if (siteMapArray.length > 0) {
            async.each(siteMapArray, function (val, siteMapCb) {
                if (_.isEqual(val._id, featuresId)) {
                    siteMap = val;
                    return siteMapCb(null);
                } else {
                    siteMapCb(null);
                }
            }, function (done) {
                if (siteMap !== null || siteMap !== undefined) {
                    try {
                        async.eachSeries(siteMap.features, function (feature, fcb) {
                            getFeatures(feature, function (feaData) {
                                if (feaData !== "error") {
                                    features.push(feaData);
                                    fcb(null);
                                } else {
                                    fcb(null);
                                }
                            });
                        }, function (featureDone) {
                            cb(features);
                        });
                    } catch (err) {
                        logger.error(err);
                        cb("error");
                    }
                } else {
                    cb("error");
                }
            });
        } else {
            cb("error");
        }
    } catch (err) {
        logger.error(err);
        cb("error");
    }
}


module.exports = function (passport) {

    passport.use('local', new LocalStrategy({
        passReqToCallback: true
    },
            function (req, username, password, done) {
                logger.info(username);
                async.parallel([
                    function (selfcb) {
                        db.collection('features').find({}, function (err, result) {
                            if (err || !result) {
                                console.log(err);
                                return done(null, false);
                            } else {
                                if (result.length > 0) {
                                    dbFeaturesArray = result;
                                    selfcb(null, dbFeaturesArray);
                                } else {
                                    selfcb(null, null);
                                    return done(null, false);
                                }
                            }
                        });
                    },
                    function (selfcb) {
                        db.collection('userSiteMap').find({}, function (err, result) {
                            if (err || !result) {
                                console.log(err);
                                return done(null, false);

                            } else {
                                if (result.length > 0) {
                                    siteMapArray = result;
                                    selfcb(null, siteMapArray);
                                } else {
                                    selfcb(null, null);
                                    return done(null, false);
                                }
                            }
                        });
                    }
                ], function (err, result) {
                    db.collection('users').findOne({
                        '_id.username': username
//                        'username': username
                    },{},
                            function (err, user) {
                                //console.log("TESTING USER LOGIN FLOW" , JSON.stringify(err) , JSON.stringify(user));
                                if (err)
                                    return done(err);
                                if (!user) {
                                    logger.error('User Not Found with username ' + username);
                                    return done(null, false);
                                }
                                if (!isValidPassword(user, password)) {
                                    logger.error('Invalid Password');
                                    return done(null, false);
                                }

                                if (!hasAccess(user)) {
                                    logger.error('Access Denied!');
                                    return done(null, false);
                                }
                                try {
                                    var userRestultObj = JSON.parse(JSON.stringify(user));
                                    userRestultObj.sites = [];
                                    async.eachSeries(user.sites, function (siteObject, siteCb) {
                                        try {
                                            db.collection('sites').find(
                                                    {
                                                        "_id.site": siteObject.siteName
                                                    }, {
                                                '_id': 0,
                                                'time_zone': 1
                                            }, function (err, data) {
                                                if (err || !data) {
                                                    logger.error(loggerMessage, err);
                                                    selfcb(err);
                                                } else {
                                                    if (data.length > 0 && data[0].time_zone != undefined) {
                                                        siteObject.time_zone = data[0].time_zone;
                                                    } else {
                                                        siteObject.time_zone = 'Asia/Kolkata';
                                                    }
                                                    var siteResultObj = siteObject;
                                                    getUserFeatures(siteObject.featuresId, function (featureData) {
                                                        if (featureData !== "error") {
                                                            siteResultObj.features = featureData;
                                                            userRestultObj.sites.push(JSON.parse(JSON.stringify(siteResultObj)));
                                                            siteCb(null);
                                                        } else {
                                                            siteCb(null);
                                                        }
                                                    });
                                                }
                                            })
                                        } catch (err) {
                                            logger.error(err);
                                            siteCb(null);
                                        }
                                    }, function (sitesDone) {
                                        _.map(userRestultObj.sites, function (s) {
                                            s.features = _.sortBy(s.features, function (f) {
                                                return f.order;
                                            });
                                        });
                                        req.session.user = userRestultObj;
                                        userRestultObj.password = null;
                                        return done(null, userRestultObj);
                                    });
                                } catch (err) {
                                    logger.error(err);
                                    return done(null, false);
                                }
                            }
                    );
                });
            }));


    /*var isValidPassword = function (user, password) {
     return bCrypt.compareSync(password, user.password);
     }*/

    var isValidPassword = function (user, password) {
        if (user.password == password)
            return true;
        else
            return false;
    };

    var hasAccess = function (user) {
        if (user.hasAccess)
            return true;
        else
            return false;
    };

};