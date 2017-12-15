const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user_Roll : [{ type: Schema.Types.ObjectId, ref: 'User_Roll' }],

    userRoll:{
        type: String,
        required: true
    }
});

const UserRoll = module.exports = mongoose.model('UserRoll', schema);