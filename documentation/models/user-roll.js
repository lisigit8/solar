const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = mongoose.Schema({
    user: { type:Schema.Types.ObjectId, ref:"User", childPath: "user_Roll", required: true },
    userRoll: { type:Schema.Types.ObjectId, ref:"UserRoll", childPath: "user_Roll", required: true },
});

schema.plugin(relationship, { relationshipPathName:'user' });
schema.plugin(relationship, { relationshipPathName:'userRoll' });

const User_Roll = module.exports = mongoose.model('User_Roll', schema);