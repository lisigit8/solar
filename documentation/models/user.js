const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

const schema = mongoose.Schema({
    user_Roll : [{ type: Schema.Types.ObjectId, ref: 'User_Roll' }],

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
        type: String
    }
});

// Schema Middleware to Encrypt Password
schema.pre('save', function(next) {
    // Apply encryption
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err); // Ensure no errors
        this.password = hash; // Apply encryption to password
        next(); // Exit middleware
    });
});

// Methods to compare password to encrypted password upon login
schema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

const User = module.exports = mongoose.model('User', schema);