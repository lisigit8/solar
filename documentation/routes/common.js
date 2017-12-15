var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = {
    findOneAndUpdateObjectWithConditions: function (obj, req, resp, objName, conditions) {
        objName.findOneAndUpdate(conditions, obj, function (err) {
            if (err) {
                resp.json(err);
            } else {
                resp.json({msg: 'Successful!'});
            }
        });
    },

    findOneAndUpdateObject: function (obj, req, resp, objName) {
        var conditions = {_id: req.body._id};
        objName.findOneAndUpdate(conditions, obj, function (err) {
            if (err) {
                resp.json(err);
            } else {
                resp.json({msg: 'Successful!'});
            }
        });
    },

    insertObject: function (newObj, resp) {
        newObj.save((err, obj) => {
            if (err) {
                resp.json(err);
            } else {
                resp.json({msg: 'Successful!', obj: obj});
            }
        });
    },

    ensureToken: function (req, resp, next) {
        console.log(req.params.userId);
        if (typeof req.headers["token"] != 'undefined') {
            console.log('////////////1');
            User.findOne({userId: req.params.userId}, function (err, obj) {
                console.log('////////////2');
                if (err) {
                    console.log('////////////3');
                    //resp.sendStatus(403);
                    resp.json(null);
                } else {
                    console.log('////////////4');
                    if (obj == null) {
                        console.log('////////////5');
                        //resp.sendStatus(403);
                        resp.json(null);
                    } else {
                        console.log('////////////6');
                        jwt.verify(req.headers["token"], 'my_secret_key', function (err, data) {
                            if (err) {
                                console.log('////////////7');
                                //resp.sendStatus(403);
                                resp.json(null);
                            } else {
                                console.log('////////////8');
                                req.data = data;
                                next();
                            }
                        });
                    }
                }
            });
        } else {
            console.log('////////////9');
            //resp.sendStatus(403);
            resp.json(null);
        }
    }
}