var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var User_Role = require('../models/user-role');

var common = require('./common');


function varUserObj(req) {
    return {
        name: req.body.name,
        userId: req.body.userId,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,

        //role: req.body.role
    };
}


router.get("/user/:id", (req, resp, next) => {
    User.findOne({_id: req.params.id}, function(err,item) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(item);
        }
    });
});
router.get('/user', (req, resp, next) => {
    User.find(function (err, users) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(users);
        }
    });
});
router.post('/login', (req, resp, next) => {
    User.findOne({userId: req.body.userId}, (err, user) => {
        if (err) {
            resp.json(err);
        } else {
            if (!user) {
                resp.json({msg: 'UserId not found!'});
            } else {
                const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                    resp.json({msg: 'Password invalid!'});
                } else {
                    const token = jwt.sign({user}, 'my_secret_key', {expiresIn: '1h'});

                    let usr = new Object();
                    usr['userId'] = user.userId;
                    usr['name'] = user.name;

                    usr['roles'] = '';
                    resp.json({
                        token: token,
                        user: usr,
                        msg: 'You are logged in!'
                    });
                    /*User_Role.find({user: user._id}).populate('role').exec(function (err, user_roles) {
                        if (err) {
                            resp.json(err);
                        } else {
                            let roles = new Array();
                            user_roles.forEach((user_role, index, array) => {
                                roles.push(user_role.role.role);

                                if (roles.length === array.length) {
                                    usr['roles'] = roles;
                                    resp.json({
                                        token: token,
                                        user: usr,
                                        msg: 'You are logged in!'
                                    });
                                }
                            });
                        }
                    });*/
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
                /*User_Role.findOneAndUpdate({user: obj}, {user: obj, role: req.body.role}, function (err) {
                    if (err) {
                        resp.json(err);
                    } else {
                        resp.json({msg: 'Successful!'});
                    }
                });*/
                resp.json({msg: 'Successful!'});
            }
        });
    } else {
        User.findOne({userId: req.body.userId}, function (err, obj) {
            if (obj != null) {
                resp.json({msg: 'User already exists!'});
            } else {
                let newObj = new User(varUserObj(req));
                newObj.save((err, obj) => {
                    if (err) {
                        resp.json(err);
                    } else {
                        /*let user_role = new User_Role({
                            user: obj,
                            role: req.body.role
                        });
                        user_role.save((err, user_role) => {
                            if (err) {
                                resp.json(err);
                            } else {
                                resp.json({msg: 'Successful!'});
                            }
                        });*/
                        resp.json({msg: 'Successful!'});
                    }
                });
            }
        });
    }
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

// user_role
router.get('/user_role', (req, resp, next) => {
    User_Role.find(function (err, items) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(items);
        }
    });
});

//check login
router.get('/check-login/:userId', common.ensureToken, (req, resp, next) => {
    resp.json(req.data);
});


module.exports = router;