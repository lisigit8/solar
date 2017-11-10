const mongoose = require('mongoose');

const schema = mongoose.Schema({
    WarrentyInformations : [{ type: Schema.Types.ObjectId, ref: 'WarrentyInfo' }],


    name:{
        type: String,
        required: true
    }
});

const Contractor = module.exports = mongoose.model('Contractor', schema);