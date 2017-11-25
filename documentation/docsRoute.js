var express = require('express');
var router = express.Router();
var warrantyInfo = require('./models/warrentyInformation');
var device = require('./models/device');
var Site = require('./models/site');
var Vendor = require('./models/vendor');
var Contractor = require('./models/amcContractor');
var hashSet = require('simple-hashset');


var Hero = require('./models/hero');

//warranty Info
router.get('/warrantyInfo', (req, resp, next)=>{
    warrantyInfo.find(function(err, warrantyInfos){
        resp.json(warrantyInfos);
    });
});
router.post('/warrantyInfo', (req, resp, next)=>{
    let newWarrantyInfo = new warrantyInfo({
        device: req.body.device,
        contractor: req.body.contractor,
        site: req.body.site,
        vendor: req.body.vendor,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cost: req.body.cost,
        file_path: req.body.file_path,
        auto_renewal: req.body.auto_renewal,
        reminder_date: req.body.reminder_date,
        send_to: req.body.send_to,
        send_via: req.body.send_via
    });
    newWarrantyInfo.save((err, warrantyInfos)=>{
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.put('/warrantyInfo', (req, resp, next)=>{
    var conditions = { _id: req.body.id };
    var update = {
        device: req.body.device,
        contractor: req.body.contractor,
        site: req.body.site,
        vendor: req.body.vendor,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cost: req.body.cost,
        file_path: req.body.file_path,
        auto_renewal: req.body.auto_renewal,
        reminder_date: req.body.reminder_date,
        send_to: req.body.send_to,
        send_via: req.body.send_via
    };
    warrantyInfo.findOneAndUpdate(conditions, update, function (err)
    {
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.delete('/warrantyInfo/:id', (req, resp, next)=>{
    warrantyInfo.remove({_id: req.params.id}, function(err, result){
        if(err){
            resp.json(err);
        }else{
            resp.json(result);
        }
    });
});

//Device
router.post('/device', (req, resp, next)=>{
        let newDevice = new device({
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name,
        ID: req.body.ID
    });
    newDevice.save((err, device)=>{
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/device", (req,resp,next)=>{
    device.find(function(err, devices){
        resp.json(devices);
    });
});
router.get("/device/site/:site_id", (req,resp,next)=>{
    warrantyInfo.find({site: req.params.site_id}).distinct('device').exec(function(err, items){
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            var devices = new Array();
            items.forEach(myFunction);
            function myFunction(item, index, array) {
                var dvice = new Object();
                device.findOne({_id: item}).exec(function(err, device){
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        console.log("device : "+device.name);
                        dvice["_id"] = device._id;
                        dvice["name"] = device.name;
                        dvice["ID"] = device.ID;

                        devices.push(dvice);

                        if(devices.length === array.length) {
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

            //setTimeout(function(){ resp.json(devices); }, 500);
        }
    });*/
});
router.delete('/device/:id', (req, resp, next)=>{
    device.remove({_id: req.params.id}, function(err, result){
        if(err){
            resp.json(err);
        }else{
            resp.json(result);
        }
    });
});


//Site
router.post('/site', (req, resp, next)=>{
    let newSite = new Site({
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    });
    newSite.save((err, site)=>{
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/site", (req,resp,next)=>{
    Site.find(function(err, sites){
        resp.json(sites);
    });
});
router.delete('/site/:id', (req, resp, next)=>{
    Site.remove({_id: req.params.id}, function(err, result){
        if(err){
            resp.json(err);
        }else{
            resp.json(result);
        }
    });
});


//Vendor
router.post('/vendor', (req, resp, next)=>{
    let newVendor = new Vendor({
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    });
    newVendor.save((err, vendor)=>{
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/vendor", (req,resp,next)=>{
    Vendor.find(function(err, vendors){
        resp.json(vendors);
    });
});
router.get("/vendor/site/:site_id", (req,resp,next)=>{
    warrantyInfo.distinct('vendor', {site: req.params.site_id} ,function(err, items){
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            var vendors = new Array();
            items.forEach(myFunction);
            function myFunction(item, index, array) {
                var vndor = new Object();
                Vendor.findOne({_id: item}).exec(function(err, vendor){
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        console.log("vendor : "+vendor.name);
                        vndor["_id"] = vendor._id;
                        vndor["name"] = vendor.name;

                        vendors.push(vndor);

                        if(vendors.length === array.length) {
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

            //setTimeout(function(){ resp.json(vendors); }, 500);
        }
    });*/
});
router.delete('/vendor/:id', (req, resp, next)=>{
    Vendor.remove({_id: req.params.id}, function(err, result){
        if(err){
            resp.json(err);
        }else{
            resp.json(result);
        }
    });
});


//Contractor
router.post('/contractor', (req, resp, next)=>{
    let newContractor = new Contractor({
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    });
    newContractor.save((err, contractor)=>{
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/contractor", (req,resp,next)=>{
    Contractor.find(function(err, contractors){
        resp.json(contractors);
    });
});
router.get("/contractor/site/:site_id", (req,resp,next)=>{
    warrantyInfo.distinct('contractor', {site: req.params.site_id} ,function(err, items){
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            var contractors = new Array();
            items.forEach(myFunction);
            function myFunction(item, index, array) {
                var cntractor = new Object();
                Contractor.findOne({_id: item}).exec(function(err, contractor){
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        console.log("vendor : "+contractor.name);
                        cntractor["_id"] = contractor._id;
                        cntractor["name"] = contractor.name;

                        contractors.push(cntractor);

                        if(contractors.length === array.length) {
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

            //setTimeout(function(){ resp.json(contractors); }, 500);
        }
    });*/
});
router.delete('/contractor/:id', (req, resp, next)=>{
    Contractor.remove({_id: req.params.id}, function(err, result){
        if(err){
            resp.json(err);
        }else{
            resp.json(result);
        }
    });
});

//warranty Details By site
router.get('/warrantyDetails/site/:site_id', (req, resp, next)=>{
    Site.findOne({_id: req.params.site_id}).populate('WarrantyInformations').exec(function(err, site) {
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            var warrantyDetails = new Array();
            var warrantyInfos = new Array();
            warrantyInfos = site.WarrantyInformations;
            site.WarrantyInformations.forEach(myFunction);

            /*function assigning(msg, callback){
                warrantyInfos.forEach(myFunction);

                console.log(msg);

                if(typeof callback === "function"){
                      callback();
                }
            }*/

            function myFunction(item, index, array) {
                var warrantyDetail = new Object();

                warrantyInfo.findOne({_id: item._id}).populate('vendor').exec(function(err, warrantyInfoVendor) {
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        warrantyInfo.findOne({_id: item._id}).populate('device').exec(function(err, warrantyInfoDevice) {
                            if (err){
                                resp.json({msg: 'Error : '+err});
                            } else{
                                warrantyInfo.findOne({_id: item._id}).populate('contractor').exec(function(err, warrantyInfoContractor) {
                                    if (err){
                                        resp.json({msg: 'Error : '+err});
                                    } else{
                                        warrantyDetail["vendor_id"] = warrantyInfoVendor.vendor._id;
                                        warrantyDetail["vendor"] = warrantyInfoVendor.vendor.name;

                                        warrantyDetail["device_id"] = warrantyInfoDevice.device._id;
                                        warrantyDetail["device_name"] = warrantyInfoDevice.device.name;
                                        warrantyDetail["device_ID"] = warrantyInfoDevice.device.ID;

                                        warrantyDetail["contractor_id"] = warrantyInfoContractor.contractor._id;
                                        warrantyDetail["contractor"] = warrantyInfoContractor.contractor.name;

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

                                        if(warrantyDetails.length === array.length) {
                                            resp.json(warrantyDetails);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }

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

            //resp.json(warrantyInfos);
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
router.get('/warrantyDetails/site/:site_id/device/:device_id', (req, resp, next)=> {
    warrantyInfo.find({site: req.params.site_id, device: req.params.device_id}, function(err, items){
        if (err) {
            resp.json({msg: 'Error : '+err});
        } else {
            var warrantyDetails = new Array();
            items.forEach(myFunction);

            function myFunction(item, index, array) {
                var warrantyDetail = new Object();

                warrantyInfo.findOne({_id: item._id}).populate('vendor').exec(function(err, warrantyInfoVendor) {
                    if (err){
                        resp.json({msg: 'Error : '+err});
                    } else{
                        warrantyInfo.findOne({_id: item._id}).populate('device').exec(function(err, warrantyInfoDevice) {
                            if (err){
                                resp.json({msg: 'Error : '+err});
                            } else{
                                warrantyInfo.findOne({_id: item._id}).populate('contractor').exec(function(err, warrantyInfoContractor) {
                                    if (err){
                                        resp.json({msg: 'Error : '+err});
                                    } else{
                                        warrantyDetail["vendor_id"] = warrantyInfoVendor.vendor._id;
                                        warrantyDetail["vendor"] = warrantyInfoVendor.vendor.name;

                                        warrantyDetail["device_id"] = warrantyInfoDevice.device._id;
                                        warrantyDetail["device_name"] = warrantyInfoDevice.device.name;
                                        warrantyDetail["device_ID"] = warrantyInfoDevice.device.ID;

                                        warrantyDetail["contractor_id"] = warrantyInfoContractor.contractor._id;
                                        warrantyDetail["contractor"] = warrantyInfoContractor.contractor.name;

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

                                        if(warrantyDetails.length === array.length) {
                                            resp.json(warrantyDetails);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }

            //resp.json(items);
        }
    });
});


//warranty Details By warranty info id
router.get('/warrantyDetails/warranty/:warranty_id', (req, resp, next)=>{
    var warrantyDetail = new Object();
    warrantyInfo.findOne({_id: req.params.warranty_id}).populate('vendor').exec(function(err, warrantyInfoVendor) {
        if (err){
            resp.json({msg: 'Error : '+err});
        } else{
            warrantyInfo.findOne({_id: req.params.warranty_id}).populate('device').exec(function(err, warrantyInfoDevice) {
                if (err){
                    resp.json({msg: 'Error : '+err});
                } else{
                    warrantyInfo.findOne({_id: req.params.warranty_id}).populate('contractor').exec(function(err, warrantyInfoContractor) {
                        if (err){
                            resp.json({msg: 'Error : '+err});
                        } else{
                            warrantyInfo.findOne({_id: req.params.warranty_id}, function(err, item) {
                                if (err){
                                    resp.json({msg: 'Error : '+err});
                                } else{
                                    console.log("vendor : "+warrantyInfoVendor.vendor.name);
                                    warrantyDetail["vendor_id"] = warrantyInfoVendor.vendor._id;
                                    warrantyDetail["vendor"] = warrantyInfoVendor.vendor.name;
                                    console.log("device : "+warrantyInfoDevice.device.name);
                                    warrantyDetail["device_id"] = warrantyInfoDevice.device._id;
                                    warrantyDetail["device_name"] = warrantyInfoDevice.device.name;
                                    warrantyDetail["device_ID"] = warrantyInfoDevice.device.ID;
                                    console.log("contractor : "+warrantyInfoContractor.contractor.name);
                                    warrantyDetail["contractor_id"] = warrantyInfoContractor.contractor._id;
                                    warrantyDetail["contractor"] = warrantyInfoContractor.contractor.name;
                                    warrantyDetail["_id"] = item._id;
                                    warrantyDetail["start_date"] = item.start_date;
                                    warrantyDetail["end_date"] = item.end_date;
                                    warrantyDetail["cost"] = item.cost;
                                    warrantyDetail["file_path"] = item.file_path;
                                    warrantyDetail["auto_renewal"] = item.auto_renewal;
                                    warrantyDetail["reminder_date"] = item.reminder_date;
                                    warrantyDetail["send_to"] = item.send_to;
                                    warrantyDetail["send_via"] = item.send_via;

                                    resp.json(warrantyDetail);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    //setTimeout(function(){ resp.json(warrantyDetail); }, 500);
});





//Hero
router.post('/hero', (req, resp, next)=>{
    let newHero = new Hero({
        id: req.body.id,
        name: req.body.name
    });
    newHero.save((err, hero)=>{
        if(err){
            resp.json({msg: 'Error : '+err});
        }else{
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/hero", (req,resp,next)=>{
    Hero.find(function(err, heros){
        resp.json(heros);
    });
});
router.delete('/hero/:id', (req, resp, next)=>{
    Hero.remove({_id: req.params.id}, function(err, result){
        if(err){
            resp.json(err);
        }else{
            resp.json(result);
        }
    });
});





module.exports=router;