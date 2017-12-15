var express = require('express');
var router = express.Router();

var Role = require('../models/role');

var common = require('./common');



function varRoleObj(req){
    return {
        user_role: req.body.user_role,
        role: req.body.role
    };
}



router.get('/role', (req, resp, next) => {
    Role.find(function (err, items) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(items);
        }
    });
});
router.post('/role', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varRoleObj(req), req, resp, Role);
    } else {
        let newObj = new Role(varRoleObj(req));
        common.insertObject(newObj, resp);
    }
});
router.get("/role/:id", (req, resp, next) => {
    Role.findOne({_id: req.params.id}, function(err,item) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(item);
        }
    });
});
router.put('/role', (req, resp, next) => {
    common.findOneAndUpdateObject(varRoleObj(req), req, resp, Role);
});
router.delete('/role/:id', (req, resp, next) => {
    Role.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



module.exports = router;