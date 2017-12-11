var express = require('express');
var router = express.Router();

var Vendor = require('../models/vendor');

var common = require('./common');



function varVendorObj(req){
    return {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    };
}



router.post('/vendor', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varVendorObj(req), req, resp, Vendor);
    } else {
        let newObj = new Vendor(varVendorObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/vendor', (req, resp, next) => {
    common.findOneAndUpdateObject(varVendorObj(req), req, resp, Vendor);
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



module.exports = router;