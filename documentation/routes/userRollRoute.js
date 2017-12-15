var express = require('express');
var router = express.Router();

var userRoll = require('../models/userRoll');

var common = require('./common');



function varUserRollObj(req){
    return {
        user_Roll: req.body.user_Roll,
        userRoll: req.body.userRoll
    };
}



router.get('/userRoll', (req, resp, next) => {
    userRoll.find(function (err, items) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(items);
        }
    });
});
router.post('/userRoll', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varUserRollObj(req), req, resp, userRoll);
    } else {
        let newObj = new userRoll(varUserRollObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/userRoll', (req, resp, next) => {
    common.findOneAndUpdateObject(varUserRollObj(req), req, resp, userRoll);
});
router.delete('/userRoll/:id', (req, resp, next) => {
    userRoll.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



module.exports = router;