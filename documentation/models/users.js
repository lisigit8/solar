const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    WarrantyInformations : [{ type: Schema.Types.ObjectId, ref: 'WarrantyInfo' }],

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});

const Users = module.exports = mongoose.model('Users', schema);