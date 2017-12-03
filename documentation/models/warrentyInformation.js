const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
relationship = require("mongoose-relationship");

var Schema = mongoose.Schema;
var schemaTypes = mongoose.Schema.Types;

const schema = mongoose.Schema({
    site: { type:Schema.Types.ObjectId, ref:"Site", childPath: "WarrantyInformations" },
    device: { type:Schema.Types.ObjectId, ref:"Device", childPath: "WarrantyInformations" },
    vendor: { type:Schema.Types.ObjectId, ref:"Vendor", childPath: "WarrantyInformations" },
    contractor: { type:Schema.Types.ObjectId, ref:"Contractor", childPath: "WarrantyInformations" },
    user: { type:Schema.Types.ObjectId, ref:"Users", childPath: "WarrantyInformations" },

    documents : [{ type: Schema.Types.ObjectId, ref: 'Documents' }],
    warrantyInfo_sendVia : [{ type: Schema.Types.ObjectId, ref: 'WarrantyInfo_SendVia' }],

    start_date:{
        type : Date,
        required: true
    },
    end_date:{
        type : Date,
        required: true
    },
    cost:{
        type: schemaTypes.Double,
        required: true
    },
    file_path:{
        type: String,
        required: true
    },
    auto_renewal:{
        type: Boolean, 
        default: true,
        required: true
    },
    reminder_date:{
        type : Date,
        required: true
    },
    send_to:{
        type: String,
        required: true
    },
    send_via:{
        type: String,
        enum : ['SMS', 'email'],
        required: true
    }
});
schema.plugin(relationship, { relationshipPathName:'device' });
schema.plugin(relationship, { relationshipPathName:'contractor' });
schema.plugin(relationship, { relationshipPathName:'site' });
schema.plugin(relationship, { relationshipPathName:'vendor' });
const WarrantyInfo = module.exports = mongoose.model('WarrantyInfo', schema);