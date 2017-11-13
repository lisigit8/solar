const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    WarrantyInformations : [{ type: Schema.Types.ObjectId, ref: 'WarrentyInfo' }],


    name:{
        type: String,
        required: true
    }
});

const Contractor = module.exports = mongoose.model('Contractor', schema);