const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
relationship = require("mongoose-relationship");

var Schema = mongoose.Schema;
var schemaTypes = mongoose.Schema.Types;

const schema = mongoose.Schema({
    site: { type:Schema.Types.ObjectId, ref:"Site", childPath: "WarrantyInformations", required: true },
    device: { type:Schema.Types.ObjectId, ref:"Device", childPath: "WarrantyInformations", required: true },
    vendor: { type:Schema.Types.ObjectId, ref:"Vendor", childPath: "WarrantyInformations", required: true },
    contractor: { type:Schema.Types.ObjectId, ref:"Contractor", childPath: "WarrantyInformations", required: true },
    customer: { type:Schema.Types.ObjectId, ref:"Customer", childPath: "WarrantyInformations", required: true },

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
    auto_renewal:{
        type: Boolean, 
        default: true,
        required: true
    },
    reminder_date:{
        type : Date,
        required: true
    }
});

schema.plugin(relationship, { relationshipPathName:'device' });
schema.plugin(relationship, { relationshipPathName:'contractor' });
schema.plugin(relationship, { relationshipPathName:'site' });
schema.plugin(relationship, { relationshipPathName:'vendor' });
schema.plugin(relationship, { relationshipPathName:'customer' });

const WarrantyInfo = module.exports = mongoose.model('WarrantyInfo', schema);