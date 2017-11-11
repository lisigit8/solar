var express = require('express');
var router = express.Router();
var warrantyInfo = require('./models/warrentyInformation');
var device = require('./models/device');
var Site = require('./models/site');


//warranty Info
router.get('/warrantyInfo', (req, resp, next)=>{
    warrantyInfo.find(function(err, warrantyInfos){
        resp.json(warrantyInfos);
    });
});
router.post('/warrantyInfo', (req, resp, next)=>{
    let newWarrantyInfo = new warrantyInfo({
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



module.exports=router;