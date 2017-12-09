var express = require('express');
var router = express.Router();

var warrantyInfo = require('../models/warrentyInformation');
var Site = require('../models/site');
var WarrantyInfo_SendVia = require('../models/warrantyInfo-sendVia');

var common = require('./common');



function varWarrantyInfoObj(req) {
    var warrantyInfoObj = {
        device: req.body.device,
        contractor: req.body.contractor,
        site: req.body.site,
        vendor: req.body.vendor,
        customer: req.body.customer,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cost: req.body.cost,
        file_path: req.body.file_path,
        auto_renewal: req.body.auto_renewal,
        reminder_date: req.body.reminder_date,
        send_to: req.body.send_to,
        send_via: req.body.send_via
    }
    return warrantyInfoObj;
}

function varWarrantySendViaObj(req) {
    return {
        warrantyInfo: req.body.warrantyInfo,
        sendVia: req.body.sendVia
    };
}



//warranty Info
router.get('/warrantyInfo', (req, resp, next) => {
    warrantyInfo.find(function (err, warrantyInfos) {
        resp.json(warrantyInfos);
    });
});
router.post('/warrantyInfo', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varWarrantyInfoObj(req), req, resp, warrantyInfo);
    } else {
        let newObj = new warrantyInfo(varWarrantyInfoObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/warrantyInfo', (req, resp, next) => {
    common.findOneAndUpdateObject(varWarrantyInfoObj(req), req, resp, warrantyInfo);
});
router.delete('/warrantyInfo/:id', (req, resp, next) => {
    warrantyInfo.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



//Warranty details
router.get('/warrantyDetails', (req, resp, next) => {
    warrantyInfo.find(function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            responseWarrantyDetails(items, resp);
        }
    });
});

//warranty Details By site
router.get('/warrantyDetails/site/:site_id', (req, resp, next) => {
    Site.findOne({_id: req.params.site_id}).populate('WarrantyInformations').exec(function (err, site) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            responseWarrantyDetails(site.WarrantyInformations, resp);

            /*function assigning(msg, callback){
                warrantyInfos.forEach(myFunction);

                console.log(msg);

                if(typeof callback === "function"){
                      callback();
                }
            }*/

            /*f1("abc", function(){
                console.log("f2 called...");
            });
            function f1(str, callback){
                console.log("f1 called...");
                console.log("f1 called...");
                console.log("f1 called...");
                console.log("f1 called...");
                console.log("f1 called...");

                if(typeof callback === "function") {
                    callback();
                }
            }*/

            //setTimeout(function(){ resp.json(warrantyDetails); }, 500);

            /*assigning("...", function(){
                resp.json(warrantyDetails);
            });*/
        }
    });
});

//Warranty details by site id and device id
/*router.get('/warrantyDetails/site/:site_id/device/:device_id', (req, resp, next)=> {
    Site.findOne({_id: req.params.site_id}).populate({
        path: 'WarrantyInformations',
        match: {device: req.params.device_id},
    }).exec(function (err, site) {
        if (err) {
            resp.json({msg: 'Error : '+err});
        } else {
            resp.json(site.WarrantyInformations);
        }
    });
});*/
router.get('/warrantyDetails/site/:site_id/device/:device_id', (req, resp, next) => {
    warrantyInfo.find({site: req.params.site_id, device: req.params.device_id}, function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            responseWarrantyDetails(items, resp);
        }
    });
});

//Warranty details by site id and vendor id
router.get('/warrantyDetails/site/:site_id/vendor/:vendor_id', (req, resp, next) => {
    warrantyInfo.find({site: req.params.site_id, vendor: req.params.vendor_id}, function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            responseWarrantyDetails(items, resp);
        }
    });
});

//Warranty details by site id and contractor id
router.get('/warrantyDetails/site/:site_id/contractor/:contractor_id', (req, resp, next) => {
    warrantyInfo.find({site: req.params.site_id, contractor: req.params.contractor_id}, function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            responseWarrantyDetails(items, resp);
        }
    });
});

// Warranty Details List Response By Warranty Info List (Function)
function responseWarrantyDetails(warrantyInfos, resp) {
    var warrantyDetails = new Array();
    if (warrantyInfos.length > 0) {
        warrantyInfos.forEach(myFunction);

        function myFunction(item, index, array) {
            var warrantyDetail = new Object();
            warrantyInfo.findOne({_id: item._id}).populate('site').exec(function (err, warrantyInfoSite) {
                if (err) {
                    resp.json({msg: 'Error : ' + err});
                } else {
                    warrantyInfo.findOne({_id: item._id}).populate('vendor').exec(function (err, warrantyInfoVendor) {
                        if (err) {
                            resp.json({msg: 'Error : ' + err});
                        } else {
                            warrantyInfo.findOne({_id: item._id}).populate('device').exec(function (err, warrantyInfoDevice) {
                                if (err) {
                                    resp.json({msg: 'Error : ' + err});
                                } else {
                                    warrantyInfo.findOne({_id: item._id}).populate('contractor').exec(function (err, warrantyInfoContractor) {
                                        if (err) {
                                            resp.json({msg: 'Error : ' + err});
                                        } else {
                                            warrantyInfo.findOne({_id: item._id}).populate('customer').exec(function (err, warrantyInfoCustomer) {
                                                if (err) {
                                                    resp.json({msg: 'Error : ' + err});
                                                } else {
                                                    warrantyDetail["site"] = warrantyInfoSite.site;
                                                    warrantyDetail["vendor"] = warrantyInfoVendor.vendor;
                                                    warrantyDetail["device"] = warrantyInfoDevice.device;
                                                    warrantyDetail["contractor"] = warrantyInfoContractor.contractor;
                                                    warrantyDetail["customer"] = warrantyInfoCustomer.customer;

                                                    warrantyDetail["_id"] = item._id;
                                                    warrantyDetail["start_date"] = item.start_date;
                                                    warrantyDetail["end_date"] = item.end_date;
                                                    warrantyDetail["cost"] = item.cost;
                                                    warrantyDetail["file_path"] = item.file_path;
                                                    warrantyDetail["auto_renewal"] = item.auto_renewal;
                                                    warrantyDetail["reminder_date"] = item.reminder_date;
                                                    warrantyDetail["send_to"] = item.send_to;
                                                    warrantyDetail["send_via"] = item.send_via;

                                                    warrantyDetails.push(warrantyDetail);

                                                    if (warrantyDetails.length === array.length) {
                                                        resp.json(warrantyDetails);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    } else {
        resp.json(warrantyDetails);
    }
}

//warranty Details By warranty info id
router.get('/warrantyDetails/warranty/:warranty_id', (req, resp, next) => {
    var warrantyDetail = new Object();
    warrantyInfo.findOne({_id: req.params.warranty_id}).populate('site').exec(function (err, warrantyInfoSite) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            warrantyInfo.findOne({_id: req.params.warranty_id}).populate('vendor').exec(function (err, warrantyInfoVendor) {
                if (err) {
                    resp.json({msg: 'Error : ' + err});
                } else {
                    warrantyInfo.findOne({_id: req.params.warranty_id}).populate('device').exec(function (err, warrantyInfoDevice) {
                        if (err) {
                            resp.json({msg: 'Error : ' + err});
                        } else {
                            warrantyInfo.findOne({_id: req.params.warranty_id}).populate('contractor').exec(function (err, warrantyInfoContractor) {
                                if (err) {
                                    resp.json({msg: 'Error : ' + err});
                                } else {
                                    warrantyInfo.findOne({_id: req.params.warranty_id}).populate('customer').exec(function (err, warrantyInfoCustomer) {
                                        if (err) {
                                            resp.json({msg: 'Error : ' + err});
                                        } else {
                                            warrantyInfo.findOne({_id: req.params.warranty_id}, function (err, item) {
                                                if (err) {
                                                    resp.json({msg: 'Error : ' + err});
                                                } else {
                                                    warrantyDetail["site"] = warrantyInfoSite.site;
                                                    warrantyDetail["vendor"] = warrantyInfoVendor.vendor;
                                                    warrantyDetail["device"] = warrantyInfoDevice.device;
                                                    warrantyDetail["contractor"] = warrantyInfoContractor.contractor;
                                                    warrantyDetail["customer"] = warrantyInfoCustomer.customer;

                                                    warrantyDetail["_id"] = item._id;
                                                    warrantyDetail["start_date"] = item.start_date;
                                                    warrantyDetail["end_date"] = item.end_date;
                                                    warrantyDetail["cost"] = item.cost;
                                                    warrantyDetail["file_path"] = item.file_path;
                                                    warrantyDetail["auto_renewal"] = item.auto_renewal;
                                                    warrantyDetail["reminder_date"] = item.reminder_date;
                                                    warrantyDetail["send_to"] = item.send_to;
                                                    warrantyDetail["send_via"] = item.send_via;

                                                    if (warrantyDetail.length === item.length) {
                                                        resp.json(warrantyDetail);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
/*router.get('/warrantyDetails/warranty/:warranty_id', (req, resp, next) => {
    warrantyInfo.findOne({_id: req.params.warranty_id}, function (err, item) {
       resp.json(item);
    });
});*/



//warranty Info - Send Via
router.get('/warrantyInfo_sendVia', (req, resp, next) => {
    WarrantyInfo_SendVia.find(function (err, items) {
        resp.json(items);
    });
});
router.get('/warrantyInfo_sendVia/warranty/:warranty_id', (req, resp, next) => {
    WarrantyInfo_SendVia.find({warrantyInfo: req.params.warranty_id}, function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            resp.json(items);
        }
    });
});
router.post('/warrantyInfo_sendVia', (req, resp, next) => {
    if (req.body._id) {
        var conditions = {warrantyInfo: req.body.warrantyInfo, sendVia: req.body.sendVia};
        common.findOneAndUpdateObject(varWarrantySendViaObj(req), req, resp, WarrantyInfo_SendVia, conditions);
    } else {
        let newObj = new WarrantyInfo_SendVia(varWarrantySendViaObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/warrantyInfo_sendVia', (req, resp, next) => {
    common.findOneAndUpdateObject(varWarrantySendViaObj(req), req, resp, WarrantyInfo_SendVia);
});
router.delete('/warrantyInfo_sendVia/:id', (req, resp, next) => {
    WarrantyInfo_SendVia.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});
router.delete('/warrantyInfo_sendVia', (req, resp, next) => {
    WarrantyInfo_SendVia.remove(function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



module.exports = router;