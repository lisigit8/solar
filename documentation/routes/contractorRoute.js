var express = require('express');
var router = express.Router();

var Contractor = require('../models/amcContractor');

var common = require('./common');



function varContractorObj(req){
    return {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    };
}



router.post('/contractor', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varContractorObj(req), req, resp, Contractor);
    } else {
        let newObj = new Customer(varContractorObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/contractor', (req, resp, next) => {
    common.findOneAndUpdateObject(varContractorObj(req), req, resp, Contractor);
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



module.exports = router;