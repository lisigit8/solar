var express = require('express');
var Promise = require('promise');
var router = express.Router();
var warrantyInfo = require('./models/warrentyInformation');
var device = require('./models/device');
var Site = require('./models/site');
var Vendor = require('./models/vendor');
var Contractor = require('./models/amcContractor');


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
router.get('/warrantyDetails/:site_id', (req, resp, next)=>{
    Site.findOne({_id: req.params.site_id}).populate('WarrantyInformations').exec(function(err, site) {
        if (err){
            return handleError(err);
        } else{
            //resp.json(site.WarrantyInformations);
            console.log("site : "+site.name);
            var warrantyInfos = new Array();
            warrantyInfos = site.WarrantyInformations;

            var warrantyDetails = new Array();
            warrantyInfos.forEach(myFunction);

            function myFunction(item, index) {
                /*assigning().then(function() {
                    console.log(index + " : " + item);
                });
                function assigning(){
                    item.vendor = "test";
                    return;
                }*/

                var warrantyDetail = new Object();

                warrantyInfo.findOne({_id: item._id}).populate('vendor').exec(function(err, warrantyInfo) {
                    if (err){
                        return handleError(err);
                    } else{
                        console.log("vendor : "+warrantyInfo.vendor.name);
                        warrantyDetail["vendor"] = warrantyInfo.vendor.name;
                    }
                });
                warrantyInfo.findOne({_id: item._id}).populate('device').exec(function(err, warrantyInfo) {
                    if (err){
                        return handleError(err);
                    } else{
                        console.log("device : "+warrantyInfo.device.name);
                        warrantyDetail["device_name"] = warrantyInfo.device.name;
                        warrantyDetail["device_ID"] = warrantyInfo.device.ID;
                    }
                });
                warrantyInfo.findOne({_id: item._id}).populate('contractor').exec(function(err, warrantyInfo) {
                    if (err){
                        return handleError(err);
                    } else{
                        console.log("contractor : "+warrantyInfo.contractor.name);
                        warrantyDetail["contractor"] = warrantyInfo.contractor.name;
                    }
                });

                warrantyDetail["start_date"] = item.start_date;
                warrantyDetail["end_date"] = item.end_date;
                warrantyDetail["cost"] = item.cost;
                warrantyDetail["file_path"] = item.file_path;
                warrantyDetail["auto_renewal"] = item.auto_renewal;
                warrantyDetail["reminder_date"] = item.reminder_date;
                warrantyDetail["send_to"] = item.send_to;
                warrantyDetail["send_via"] = item.send_via;

                warrantyDetails.push(warrantyDetail);
            }

            //resp.json(warrantyInfos);
            setTimeout(function(){ resp.json(warrantyDetails); }, 500);
        }
    });
});



module.exports=router;