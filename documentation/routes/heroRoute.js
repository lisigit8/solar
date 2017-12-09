var express = require('express');
var router = express.Router();

var Hero = require('../models/hero');

var common = require('./common');



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



module.exports = router;