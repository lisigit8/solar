const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user_userRoll : [{ type: Schema.Types.ObjectId, ref: 'User_UserRoll' }],

    useRoll:{
        type: String,
        required: true
    }
});

const UserRoll = module.exports = mongoose.model('UserRoll', schema);