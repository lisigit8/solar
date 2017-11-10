const mongoose = require('mongoose');

const schema = mongoose.Schema({
    WarrantyInformations : [{ type: Schema.Types.ObjectId, ref: 'WarrantyInfo' }],



    name:{
        type: String,
        required: true
    },
    ID:{
        type: String,
        required: true
    }
});

const Device = module.exports = mongoose.model('Device', schema);