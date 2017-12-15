const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user: { type:Schema.Types.ObjectId, ref:"User", childPath: "user_role", required: true },
    role: { type:Schema.Types.ObjectId, ref:"Role", childPath: "user_role", required: true },
});

schema.plugin(relationship, { relationshipPathName:'user' });
schema.plugin(relationship, { relationshipPathName:'role' });

const User_Role = module.exports = mongoose.model('User_Role', schema);