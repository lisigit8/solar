const mongoose = require('mongoose');

const schema = mongoose.Schema({
    WarrantyInformations : [{ type: Schema.Types.ObjectId, ref: 'WarrantyInfo' }],



    name:{
        type: String,
        required: true
    }
});

const Vendor = module.exports = mongoose.model('Vendor', schema);