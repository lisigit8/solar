var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var User_Roll = require('../models/user-roll');

var common = require('./common');


function varUserObj(req) {
    return {
        name: req.body.name,
        userId: req.body.userId,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,

        userRoll: req.body.userRoll
    };
}


router.get('/user', (req, resp, next) => {
    User.find(function (err, users) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(users);
        }
    });
});
router.post('/login', (req, resp, next)=>{
    User.findOne({ userId: req.body.userId }, (err, user) => {
        if (err) {
            resp.json(err);
        } else {
            if (!user) {
                resp.json({msg: 'UserId not found!' });
            } else {
                const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                    resp.json({ msg: 'Password invalid!' });
                } else {
                    const token = jwt.sign({user}, 'my_secret_key', {expiresIn: '1h'});

                    let usr = new Object();
                    usr['userId'] = user.userId;
                    usr['name'] = user.name;
                    User_Roll.findOne({user: user._id}).populate('userRoll').exec(function (err, user_roll) {
                        if (err) {
                            resp.json(err);
                        } else {
                            usr['userRoll'] = user_roll.userRoll.userRoll;

                            resp.json({
                                token: token,
                                user: usr,
                                msg: 'You are logged in!'
                            });
                        }
                    });
                }
            }
        }
    });
});

router.post('/user', (req, resp, next) => {
    if (req.body._id) {
        var conditions = {_id: req.body._id};
        User.findOneAndUpdate(conditions, varUserObj(req), function (err, obj) {
            if (err) {
                resp.json(err);
            } else {
                User_Roll.findOneAndUpdate({user: obj}, {user: obj, userRoll: req.body.userRoll}, function (err) {
                    if (err) {
                        resp.json(err);
                    } else {
                        resp.json({msg: 'Successful!'});
                    }
                });
            }
        });
    } else {
        let newObj = new User(varUserObj(req));
        newObj.save((err, obj) => {
            if (err) {
                resp.json(err);
            } else {
                let user_roll = new User_Roll({
                    user: obj,
                    userRoll: req.body.userRoll
                });
                user_roll.save((err, user_roll) => {
                    User_Roll.findOneAndUpdate({user: obj}, user_roll, function (err) {
                        if (err) {
                            resp.json(err);
                        } else {
                            resp.json({msg: 'Successful!'});
                        }
                    });
                });
            }
        });
    }
});
router.put('/user', (req, resp, next) => {
    common.findOneAndUpdateObject(varUserObj(req), req, resp, User);
});
router.delete('/user/:id', (req, resp, next) => {
    User.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});

// user_roll
router.get('/user_roll', (req, resp, next) => {
    User_Roll.find(function (err, items) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(items);
        }
    });
});


module.exports = router;