var express = require('express');
var router = express.Router();

var Site = require('../models/site');

var common = require('./common');



function varSiteObj(req){
    var siteObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name
    }
    return siteObj;
}



router.post('/site', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varSiteObj(req), req, resp, Site);
    } else {
        let newObj = new Site(varSiteObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/site', (req, resp, next) => {
    common.findOneAndUpdateObject(varSiteObj(req), req, resp, Site);
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
router.get('/sites', (req, resp, next) => {
    resp.json(req.query.site_ids);
});



module.exports = router;