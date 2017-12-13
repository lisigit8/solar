var express = require('express');
var router = express.Router();

var Documents = require('../models/documents');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var common = require('./common');



router.post('/documents', upload.array('files'), function (req, resp, next) {
    var docList = new Array();
    req.files.map(item => {
        let newObj = new Documents({
            original_name: item.originalname,
            file_name: item.filename,
            mime_type: item.mimetype,
            path: item.path,
            size: item.size
        });
        newObj.save((err, obj) => {
            docList.push(obj);
            if (err) {
                resp.json(err);
            } else {
                //resp.json({msg: 'Successful!'});
                if (req.files.length === docList.length) {
                    resp.json(docList);
                }
            }
        });
    });

    //resp.setHeader('Content-Type', 'application/json');
    //resp.send(JSON.stringify(req.files));
});
router.put('/documents', (req, resp, next) => {
    var conditions = {_id: req.body._id};
    Documents.findOneAndUpdate(conditions, {
        warrantyInfo: req.body.warrantyInfo,
        original_name: req.body.original_name,
        file_name: req.body.file_name,
        mime_type: req.body.mime_type,
        path: req.body.path,
        size: req.body.size
    }, function (err) {
        if (err) {
            resp.json(err);
        } else {
            resp.json({msg: 'Successful!'});
        }
    });
});
router.get("/documents", (req, resp, next) => {
    Documents.find(function (err, docs) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(docs);
        }
    });
});
router.get('/documents/warranty/:warranty_id', (req, resp, next) => {
    Documents.find({warrantyInfo: req.params.warranty_id}, function (err, items) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(items);
        }
    });
});
router.delete('/documents/:id', (req, resp, next) => {
    Documents.remove({_id: req.params.id}, function (err, result) {
        if (err) {
            resp.json(err);
        } else {
            resp.json(result);
        }
    });
});
router.get('/documents/:id', (req, resp,next)=>{
    Documents.findOne({_id: req.params.id}, function(err, item){
        if(err){
            resp.json(err);
        }else{
            resp.json(item);
        }
    });
});
router.get('/downloadDocs/:id', (req, resp,next)=>{
    Documents.findOne({_id: req.params.id}, function(err, item){
        if(err){
            resp.json(err);
        }else{
            resp.download(item.path, item.original_name);
        }
    });
});



module.exports = router;