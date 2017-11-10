var express = require('express');
var router = express.Router();
var warrantyInfo = require('./models/warrentyInformation');

router.get("/warrantyInfo", (req,resp,next)=>{
    warrantyInfo.find((err,warrantyInfos)=>{
        resp.json(warrantyInfos);
    });
});

router.post("/warrantyInfo", (req,resp,next)=>{
    var newWarrantyInfo = new warrantyInfo({
        start_date: new Date(),
        end_date: new Date(),
        cost: 456.90,
        file_path: "sdfsd",
        auto_renewal: true,
        reminder_date: new Date(),
        send_to: "jaslkjf",
        send_via: "SMS"
    });
    newWarrantyInfo.save((err,warrantyInfos)=>{
        resp.json(err);
    });
});

module.exports=router;