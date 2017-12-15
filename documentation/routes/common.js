var jwt = require('jsonwebtoken');

module.exports = {
    findOneAndUpdateObject: function (obj, req, resp, objName, conditions) {
        objName.findOneAndUpdate(conditions, obj, function (err) {
            if (err) {
                resp.json(err);
            } else {
                resp.json({msg: 'Successful!'});
            }
        });
    },

    findOneAndUpdateObject: function (obj, req, resp, objName) {
        var conditions = {_id: req.body._id};
        objName.findOneAndUpdate(conditions, obj, function (err) {
            if (err) {
                resp.json(err);
            } else {
                resp.json({msg: 'Successful!'});
            }
        });
    },

    insertObject: function (newObj, resp) {
        newObj.save((err, obj) => {
            if (err) {
                resp.json(err);
            } else {
                resp.json({msg: 'Successful!', obj: obj});
            }
        });
    },

    ensureToken: function (req, resp, next) {
        if (typeof req.headers["token"] != 'undefined') {
            jwt.verify(req.headers["token"], 'my_secret_key', function (err, data) {
                if (err) {
                    //resp.sendStatus(403);
                    resp.json([]);
                } else {
                    req.data = data;
                    next();
                }
            });
        } else {
            //resp.sendStatus(403);
            resp.json([]);
        }
    }
}