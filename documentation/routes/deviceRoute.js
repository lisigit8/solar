var express = require('express');
var router = express.Router();

var Device = require('../models/device');
var DeviceName = require('../models/deviceName');

var common = require('./common');


function varDeviceObj(req) {
    var deviceObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        deviceName: req.body.deviceName,

        name: req.body.name,
        ID: req.body.ID
    }
    return deviceObj;
}

function varDeviceNameObj(req) {
    return {
        devices: req.body.devices,
        name: req.body.name
    };
}


//Device
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
router.get("/device/deviceName/:deviceName_id", (req, resp, next) => {
    Device.find({deviceName: req.params.deviceName_id}, function (err, devices) {
        resp.json(devices);
    });
});
router.get("/device/ID/:ID", (req, resp, next) => {
    Device.findOne({ID: req.params.ID}, function (err, device) {
        resp.json(device);
    });
});
router.get("/device/site/:site_id", (req, resp, next) => {
    warrantyInfo.find({site: req.params.site_id}).distinct('device').exec(function (err, items) {
        if (err) {
            resp.json(err);
        } else {
            var devices = new Array();
            items.forEach(myFunction);

            function myFunction(item, index, array) {
                var dvice = new Object();
                device.findOne({_id: item}).exec(function (err, device) {
                    if (err) {
                        resp.json(err);
                    } else {
                        dvice["_id"] = device._id;
                        //dvice["name"] = device.name;
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

//Device Name
router.post('/deviceName', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varDeviceNameObj(req), req, resp, DeviceName);
    } else {
        let newObj = new DeviceName(varDeviceNameObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/deviceName', (req, resp, next) => {
    common.findOneAndUpdateObject(varDeviceNameObj(req), req, resp, DeviceName);
});
router.get("/deviceName", (req, resp, next) => {
    DeviceName.find(function (err, devices) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(devices);
        }
    });
});
router.get("/deviceName/:id", (req, resp, next) => {
    DeviceName.findOne({_id: req.params.id}, function(err,item) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(item);
        }
    });
});
router.delete('/deviceName/:id', (req, resp, next) => {
    DeviceName.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});


module.exports = router;