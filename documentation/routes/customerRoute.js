var express = require('express');
var router = express.Router();

var Customer = require('../models/customer');

var common = require('./common');



function varCustomerObj(req){
    var customerObj = {
        WarrantyInformations: req.body.WarrantyInformations,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address
    }
    return customerObj;
}



router.get('/customer', (req, resp, next) => {
    Customer.find(function (err, customers) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(customers);
        }
    });
});
router.get('/customer/name/:name/mobile/:mobile', (req, resp, next) => {
    Customer.findOne({name: req.params.name, mobile: req.params.mobile}, function (err, customer) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(customer);
        }
    });
});
router.post('/customer', (req, resp, next) => {
    if (req.body._id) {
        common.findOneAndUpdateObject(varCustomerObj(req), req, resp, Customer);
    } else {
        let newObj = new Customer(varCustomerObj(req));
        common.insertObject(newObj, resp);
    }
});
router.put('/customer', (req, resp, next) => {
    common.findOneAndUpdateObject(varCustomerObj(req), req, resp, Customer);
});
router.delete('/customer/:id', (req, resp, next) => {
    Customer.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});



module.exports = router;