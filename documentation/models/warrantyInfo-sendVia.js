const mongoose = require('mongoose');
var Schema = mongoose.Schema;
relationship = require("mongoose-relationship");

const schema = mongoose.Schema({
    warrantyInfo: { type:Schema.Types.ObjectId, ref:"WarrantyInfo", childPath: "warrantyInfo_sendVia" },
    sendVia: { type:Schema.Types.ObjectId, ref:"SendVia", childPath: "warrantyInfo_sendVia" },


    send_via:{
        type: String,
        enum : ['SMS', 'email'],
        required: true
    }
});

schema.plugin(relationship, { relationshipPathName:'warrantyInfo' });
schema.plugin(relationship, { relationshipPathName:'sendVia' });

const WarrantyInfo_SendVia = module.exports = mongoose.model('WarrantyInfo_SendVia', schema);