const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user_userRoll : [{ type: Schema.Types.ObjectId, ref: 'User_UserRoll' }],

    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    password:{
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

const User = module.exports = mongoose.model('User', schema);