const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    warrantyInfo: { type:Schema.Types.ObjectId, ref:"WarrantyInfo", childPath: "documents" },

    original_name:{
        type: String,
        required: true
    },
    file_name:{
        type: String,
        required: true
    },
    mime_type:{
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    }
});

const Documents = module.exports = mongoose.model('Documents', schema);