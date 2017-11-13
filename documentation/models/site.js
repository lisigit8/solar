const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    WarrantyInformations : [{ type: Schema.Types.ObjectId, ref: 'WarrantyInfo' }],



    name:{
        type: String,
        required: true
    }
});

const Site = module.exports = mongoose.model('Site', schema);