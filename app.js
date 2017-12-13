var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = global.config = require('./config.js')['pstg'];
var expressSession = require('express-session');
var passport = require('passport');
var app = express();
var router = express.Router();
var cors=require('cors');
var moogose=require('mongoose');

var documentRoute = require('./documentation/routes/documentRoute');
var siteRoute = require('./documentation/routes/siteRoute');
var vendorRoute = require('./documentation/routes/vendorRoute');
var contractorRoute = require('./documentation/routes/contractorRoute');
var customerRoute = require('./documentation/routes/customerRoute');
var deviceRoute = require('./documentation/routes/deviceRoute');
var warrantyRoute = require('./documentation/routes/warrantyRoute');
var sendViaRoute = require('./documentation/routes/sendViaRoute');
var userRoute = require('./documentation/routes/userRoute');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json({
    extended: true,
    limit: "30mb"
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api", documentRoute);
app.use("/api", siteRoute);
app.use("/api", vendorRoute);
app.use("/api", contractorRoute);
app.use("/api", customerRoute);
app.use("/api", deviceRoute);
app.use("/api", warrantyRoute);
app.use("/api", sendViaRoute);
app.use("/api", userRoute);

var initPassport = require('./passport/init');
initPassport(passport);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(cookieParser());

app.use(expressSession({
    secret: 'erixissessionsecreat',
    cookie: {
        maxAge: 8640000000
    },
    resave: true,
    saveUninitialized: true
}));


var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.get('/', function (req, res) {

    if (req.session.user) {

        console.log(JSON.stringify(req.session.user));

        res.render('mm', {
            title: 'Erixis',
            user: req.session.user,
            env: config.env,
            minification: config.minification
        });
    } else {

        res.render('index', {
            title: 'Erixis'
        });
    }

});


router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
            return res.render('index', {
                title: 'Erixis',
                message: "Invalid Crdentials"
            });
            //return res.send({ success: false, message: 'authentication failed' });
        }

        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/maintenance');
        });
    })(req, res, next);
});


router.get('/maintenance', isAuthenticated, function (req, res, next) {
    if (req.session.user) {
        res.render('mm', {
            title: 'Erixis',
            user: req.session.user,
            env: config.env,
            minification: config.minification
        });
    } else {

        res.render('index', {
            title: 'Erixis',
            message: message
        });
    }
});

router.get('/getuser', isAuthenticated, function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user);res.end();
    } else {
        res.json({});res.end();
    }
});

app.use('/', router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen('3000', function () {
    console.log('Listening to port 3000');
});


moogose.connect('mongodb://localhost:27017/dataDocs');
moogose.connection.on("connected",()=>{
    console.log("Mongodb connected successfully");
});
moogose.connection.on("error",(err)=>{
    console.log("Mongodb connecttion failed "+err);
});

module.exports = app;
