var login = require('./login');
var mongojs = require('mongojs');
var config = global.config
var databaseUrl = config.database.solarpulse.live_DB;
var db = mongojs(databaseUrl, ['users']);

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        console.log('serializing user: ');
        console.log(user._id.username);
        done(null, user._id);
//        console.log(user.username);
//        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        //console.log(mongojs.ObjectId(id));
        db.users.find({
            "_id": id
        }, function (err, user) {
            //console.log('deserializing user: ' + id);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    //signup(passport);

}
