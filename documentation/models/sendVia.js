const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    warrantyInfo_sendVia : [{ type: Schema.Types.ObjectId, ref: 'WarrantyInfo_SendVia' }],


    send_via:{
        type: String,
        enum : ['SMS', 'email'],
        required: true
    }
});

const SendVia = module.exports = mongoose.model('SendVia', schema);