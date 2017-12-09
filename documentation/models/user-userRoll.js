const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user: { type:Schema.Types.ObjectId, ref:"User", childPath: "user_userRoll" },
    userRoll: { type:Schema.Types.ObjectId, ref:"UserRoll", childPath: "user_userRoll" },
});

schema.plugin(relationship, { relationshipPathName:'user' });
schema.plugin(relationship, { relationshipPathName:'userRoll' });

const User_UserRoll = module.exports = mongoose.model('User_UserRoll', schema);