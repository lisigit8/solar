var express = require('express');
var router = express.Router();

var User = require('../models/user');

var common = require('./common');



function varUserObj(req){
    return {
        name: req.body.name,
        userId: req.body.userId,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address
    };
}



router.get('/user', (req, resp, next) => {
    User.find(function (err, users) {
        resp.json(users);
    });
});
router.post('/user', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varUserObj(req), req, resp, User);
    } else {
        let newObj = new User(varUserObj(req));
        common.insertObject(newObj, resp);
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



module.exports = router;