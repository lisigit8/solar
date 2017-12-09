var express = require('express');
var router = express.Router();

var Device = require('../models/device');

var common = require('./common');



function varDeviceObj(req){
    var deviceObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name,
        ID: req.body.ID
    }
    return deviceObj;
}



router.post('/device', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varDeviceObj(req), req, resp, Device);
    } else {
        let newObj = new Device(varDeviceObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/device', (req, resp, next) => {
    common.findOneAndUpdateObject(varDeviceObj(req), req, resp, Device);
});
router.get("/device", (req, resp, next) => {
    Device.find(function (err, devices) {
        resp.json(devices);
    });
});
router.get("/device/site/:site_id", (req, resp, next) => {
    warrantyInfo.find({site: req.params.site_id}).distinct('device').exec(function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            var devices = new Array();
            items.forEach(myFunction);

            function myFunction(item, index, array) {
                var dvice = new Object();
                device.findOne({_id: item}).exec(function (err, device) {
                    if (err) {
                        resp.json({msg: 'Error : ' + err});
                    } else {
                        console.log("device : " + device.name);
                        dvice["_id"] = device._id;
                        dvice["name"] = device.name;
                        dvice["ID"] = device.ID;

                        devices.push(dvice);

                        if (devices.length === array.length) {
                            resp.json(devices);
                        }
                    }
                });
            }
        }
    });
});
router.delete('/device/:id', (req, resp, next) => {
    Device.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



module.exports = router;