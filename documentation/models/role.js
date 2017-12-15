const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user_role : [{ type: Schema.Types.ObjectId, ref: 'User_Role' }],

    role:{
        type: String,
        required: true
    }
});

const Role = module.exports = mongoose.model('Role', schema);