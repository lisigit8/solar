module.exports = {
    findOneAndUpdateObject: function(obj, req, resp, objName)
{
    var conditions = {_id: req.body._id};
    console.log(req.body._id);
    objName.findOneAndUpdate(conditions, obj, function (err) {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            resp.json({msg: 'Successful!'});
        }
    });
},

insertObject: function(newObj, resp) {
    newObj.save((err, obj) => {
        if (err) {
            resp.json({msg: 'Error : ' + err});
        } else {
            resp.json({msg: 'Successful!'});
        }
    });
}
}