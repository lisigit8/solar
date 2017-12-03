var express = require('express');
var router = express.Router();
var warrantyInfo = require('./models/warrentyInformation');
var device = require('./models/device');
var Site = require('./models/site');
var Vendor = require('./models/vendor');
var Contractor = require('./models/amcContractor');
var hashSet = require('simple-hashset');
var User = require('./models/users');
var Documents = require('./models/documents')

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


var Hero = require('./models/hero');

function varWarrantyInfoObj(req) {
    var warrantyInfoObj = {
        device: req.body.device,
        contractor: req.body.contractor,
        site: req.body.site,
        vendor: req.body.vendor,
        user: req.body.user,
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
function varUserObj(req){
    var userObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address
    }
    return userObj;
}
function varDeviceObj(req){
    var deviceObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name,
        ID: req.body.ID
    }
    return deviceObj;
}
function varSiteObj(req){
    var siteObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    }
    return siteObj;
}
function varVendorObj(req){
    return {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    };
}
function varContractorObj(req){
    return {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    };
}


function findOneAndUpdateObject(obj, req, resp, objName) {
    var conditions = {_id: req.body._id};
    console.log(req.body._id);
    objName.findOneAndUpdate(conditions, obj, function (err) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            resp.json({msg: 'Successful!'});
        }
    });
}
function insertObject(newObj, resp) {
    newObj.save((err, obj) => {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            resp.json({msg: 'Successful!'});
        }
    });
}

//warranty Info
router.get('/warrantyInfo', (req, resp, next) => {
    warrantyInfo.find(function (err, warrantyInfos) {
        resp.json(warrantyInfos);
    });
});
router.post('/warrantyInfo', (req, resp, next) => {
    if (req.body._id) {
        findOneAndUpdateObject(varWarrantyInfoObj(req), req, resp, warrantyInfo);
    } else {
        let newObj = new warrantyInfo(varWarrantyInfoObj(req));
        insertObject(newObj, resp);
    }
});
router.put('/warrantyInfo', (req, resp, next) => {
    findOneAndUpdateObject(varWarrantyInfoObj(req), req, resp, warrantyInfo);
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

//user
router.get('/user', (req, resp, next) => {
    User.find(function (err, users) {
        resp.json(users);
    });
});
router.post('/user', (req, resp, next) => {
    if (req.body._id) {
        findOneAndUpdateObject(varUserObj(req), req, resp, User);
    } else {
        let newObj = new User(varUserObj(req));
        insertObject(newObj, resp);
    }
});
router.put('/user', (req, resp, next) => {
    findOneAndUpdateObject(varUserObj(req), req, resp, User);
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

//Device
router.post('/device', (req, resp, next) => {
    if (req.body._id) {
        findOneAndUpdateObject(varDeviceObj(req), req, resp, device);
    } else {
        let newObj = new device(varDeviceObj(req));
        insertObject(newObj, resp);
    }
});
router.put('/device', (req, resp, next) => {
    findOneAndUpdateObject(varDeviceObj(req), req, resp, device);
});
router.get("/device", (req, resp, next) => {
    device.find(function (err, devices) {
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

    /*Site.findOne({_id: req.params.site_id}).populate('WarrantyInformations').exec(function(err, site) {
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            console.log("site : "+site.name);
            var devices = new Array();
            /!*var warrantyInfos = new Array();
            warrantyInfos = site.WarrantyInformations;*!/
            site.WarrantyInformations.forEach(myFunction);

            function myFunction(item, index, array) {
                var device = new Object();

                warrantyInfo.findOne({_id: item._id}).populate('device').exec(function(err, warrantyInfo) {
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        console.log("device : "+warrantyInfo.device.name);
                        device["_id"] = warrantyInfo.device._id;
                        device["name"] = warrantyInfo.device.name;
                        device["ID"] = warrantyInfo.device.ID;

                        devices.push(device);

                        if(devices.length === array.length) {
                            resp.json(devices);
                        }
                    }
                });
            }
        }
    });*/
});
router.delete('/device/:id', (req, resp, next) => {
    device.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});


//Site
router.post('/site', (req, resp, next) => {
    if (req.body._id) {
        findOneAndUpdateObject(varSiteObj(req), req, resp, Site);
    } else {
        let newObj = new Site(varSiteObj(req));
        insertObject(newObj, resp);
    }
});
router.put('/site', (req, resp, next) => {
    findOneAndUpdateObject(varSiteObj(req), req, resp, Site);
});
router.get("/site", (req, resp, next) => {
    Site.find(function (err, sites) {
        resp.json(sites);
    });
});
router.delete('/site/:id', (req, resp, next) => {
    Site.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});


//Vendor
router.post('/vendor', (req, resp, next) => {
    if (req.body._id) {
        findOneAndUpdateObject(varVendorObj(req), req, resp, Vendor);
    } else {
        let newObj = new User(varVendorObj(req));
        insertObject(newObj, resp);
    }
});
router.put('/vendor', (req, resp, next) => {
    findOneAndUpdateObject(varVendorObj(req), req, resp, Vendor);
});
router.get("/vendor", (req, resp, next) => {
    Vendor.find(function (err, vendors) {
        resp.json(vendors);
    });
});
router.get("/vendor/site/:site_id", (req, resp, next) => {
    warrantyInfo.distinct('vendor', {site: req.params.site_id}, function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            var vendors = new Array();
            items.forEach(myFunction);

            function myFunction(item, index, array) {
                var vndor = new Object();
                Vendor.findOne({_id: item}).exec(function (err, vendor) {
                    if (err) {
                        resp.json({msg: 'Error : ' + err});
                    } else {
                        console.log("vendor : " + vendor.name);
                        vndor["_id"] = vendor._id;
                        vndor["name"] = vendor.name;

                        vendors.push(vndor);

                        if (vendors.length === array.length) {
                            resp.json(vendors);
                        }
                    }
                });
            }
        }
    });

    /*Site.findOne({_id: req.params.site_id}).populate('WarrantyInformations').exec(function(err, site) {
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            console.log("site : "+site.name);
            var vendors = new Array();
            /!*var warrantyInfos = new Array();
            warrantyInfos = site.WarrantyInformations;*!/
            site.WarrantyInformations.forEach(myFunction);

            function myFunction(item, index, array) {
                var vendor = new Object();

                warrantyInfo.findOne({_id: item._id}).populate('vendor').exec(function(err, warrantyInfo) {
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        console.log("vendor : "+warrantyInfo.vendor.name);
                        vendor["_id"] = warrantyInfo.vendor._id;
                        vendor["name"] = warrantyInfo.vendor.name;

                        vendors.push(vendor);

                        if(vendors.length === array.length){
                            resp.json(vendors);
                        }
                    }
                });
            }
        }
    });*/
});
router.delete('/vendor/:id', (req, resp, next) => {
    Vendor.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});


//Contractor
router.post('/contractor', (req, resp, next) => {
    if (req.body._id) {
        findOneAndUpdateObject(varContractorObj(req), req, resp, Contractor);
    } else {
        let newObj = new User(varContractorObj(req));
        insertObject(newObj, resp);
    }
});
router.put('/contractor', (req, resp, next) => {
    findOneAndUpdateObject(varContractorObj(req), req, resp, Contractor);
});
router.get("/contractor", (req, resp, next) => {
    Contractor.find(function (err, contractors) {
        resp.json(contractors);
    });
});
router.get("/contractor/site/:site_id", (req, resp, next) => {
    warrantyInfo.distinct('contractor', {site: req.params.site_id}, function (err, items) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            var contractors = new Array();
            items.forEach(myFunction);

            function myFunction(item, index, array) {
                var cntractor = new Object();
                Contractor.findOne({_id: item}).exec(function (err, contractor) {
                    if (err) {
                        resp.json({msg: 'Error : ' + err});
                    } else {
                        console.log("vendor : " + contractor.name);
                        cntractor["_id"] = contractor._id;
                        cntractor["name"] = contractor.name;

                        contractors.push(cntractor);

                        if (contractors.length === array.length) {
                            resp.json(contractors);
                        }
                    }
                });
            }
        }
    });

    /* Site.findOne({_id: req.params.site_id}).populate('WarrantyInformations').exec(function(err, site) {
         if (err){
             resp.json({msg: 'Error : '+err});
         } else{
             console.log("site : "+site.name);
             var contractors = new Array();
             /!*var warrantyInfos = new Array();
             warrantyInfos = site.WarrantyInformations;*!/
             site.WarrantyInformations.forEach(myFunction);

             function myFunction(item, index, array) {
                 var contractor = new Object();

                 warrantyInfo.findOne({_id: item._id}).populate('contractor').exec(function(err, warrantyInfo) {
                     if (err){
                         resp.json({msg: 'Error : '+err});
                     } else{
                         console.log("contractor : "+warrantyInfo.contractor.name);
                         contractor["_id"] = warrantyInfo.contractor._id;
                         contractor["name"] = warrantyInfo.contractor.name;

                         contractors.push(contractor);

                         if(contractors.length === array.length) {
                             resp.json(contractors);
                         }
                     }
                 });
             }
         }
     });*/
});
router.delete('/contractor/:id', (req, resp, next) => {
    Contractor.remove({_id: req.params.id}, function (err, result) {
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
    if (warrantyInfos.length > 0) {
        var warrantyDetails = new Array();
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
                                            warrantyInfo.findOne({_id: item._id}).populate('user').exec(function (err, warrantyInfoUser) {
                                                if (err) {
                                                    resp.json({msg: 'Error : ' + err});
                                                } else {
                                                    warrantyDetail["site"] = warrantyInfoSite.site;
                                                    warrantyDetail["vendor"] = warrantyInfoVendor.vendor;
                                                    warrantyDetail["device"] = warrantyInfoDevice.device;
                                                    warrantyDetail["contractor"] = warrantyInfoContractor.contractor;
                                                    warrantyDetail["user"] = warrantyInfoUser.user;

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
        resp.json([]);
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
                                    warrantyInfo.findOne({_id: req.params.warranty_id}).populate('user').exec(function (err, warrantyInfoUser) {
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
                                                    warrantyDetail["user"] = warrantyInfoUser.user;

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


//Hero
router.post('/hero', (req, resp, next) => {
    let newHero = new Hero({
        id: req.body.id,
        name: req.body.name
    });
    newHero.save((err, hero) => {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/hero", (req, resp, next) => {
    Hero.find(function (err, heros) {
        resp.json(heros);
    });
});
router.delete('/hero/:id', (req, resp, next) => {
    Hero.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});


//warranty Details By multi site
router.get('/warrantyDetails/site', (req, resp, next) => {
    resp.json(req.query.site_ids);
});



//documents
router.post('/documents', upload.array('files'), function (req, res, next) {
    var arr = req.files;
    arr.map(item => {
        let newObj = new Documents({
            warrantyInfo: "5a23cd57ced7bc0c94d9677d",
            original_name: item.originalname,
            file_name: item.filename,
            mime_type: item.mimetype,
            path: item.path,
            size: item.size
        });
        newObj.save((err, obj) => {
            /*if (err) {
                resp.json({msg: 'Error : ' + err});
            } else {
                resp.json({msg: 'Successful!'});
            }*/
        });
    });


    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(req.files));
});
router.get("/documents", (req, resp, next) => {
    Documents.find(function (err, docs) {
        resp.json(docs);
    });
});




module.exports = router;