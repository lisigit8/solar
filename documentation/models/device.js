const mongoose = require('mongoose');
var Schema = mongoose.Schema;
relationship = require("mongoose-relationship");

const schema = mongoose.Schema({
    deviceName: {type: Schema.Types.ObjectId, ref: "DeviceName", childPath: "devices", required: true},
    WarrantyInformations: [{type: Schema.Types.ObjectId, ref: 'WarrantyInfo'}],


    /*name: {
        type: String
    },*/
    ID: {
        type: String,
        required: true
    }
});

schema.plugin(relationship, {relationshipPathName: 'deviceName'});

const Device = module.exports = mongoose.model('Device', schema);