const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var schemaTypes = mongoose.Schema.Types;

const schema = mongoose.Schema({
    start_date:{
        type : Date,
        required: true
    },
    end_date:{
        type : Date,
        required: true
    },
    cost:{
        type: schemaTypes.Double,
        required: true
    },
    file_path:{
        type: String,
        required: true
    },
    auto_renewal:{
        type: Boolean, 
        default: true,
        required: true
    },
    reminder_date:{
        type : Date,
        required: true
    },
    send_to:{
        type: String,
        required: true
    },
    send_via:{
        type: String,
        enum : ['SMS', 'email'],
        required: true
    }
});

const WarrantyInfo = module.exports = mongoose.model('WarrantyInfo', schema);