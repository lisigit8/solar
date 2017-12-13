const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    devices: [{type: Schema.Types.ObjectId, ref: 'Device'}],


    name: {
        type: String,
        required: true
    }
});

const DeviceName = module.exports = mongoose.model('DeviceName', schema);