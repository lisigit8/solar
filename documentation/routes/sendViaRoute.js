var express = require('express');
var router = express.Router();

var SendVia = require('../models/sendVia');

var common = require('./common');



function varSendViaObj(req){
    return {
        send_via: req.body.send_via
    };
}



router.post('/sendVia', (req, resp, next) => {
    SendVia.find(function (err, sites) {
        if(sites.length<2){
            if (req.body._id) {
                common.findOneAndUpdateObject(varSendViaObj(req), req, resp, SendVia);
            } else {
                let newObj = new SendVia(varSendViaObj(req));
                common.insertObject(newObj, resp);
            }
        }else{
            resp.json("Already exists!");
        }
    });
});
router.get("/sendVia", (req, resp, next) => {
    SendVia.find(function (err, sites) {
        resp.json(sites);
    });
});
router.delete('/sendVia/:id', (req, resp, next) => {
    SendVia.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



module.exports = router;