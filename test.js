/*
var express = require('express');
var jwt = require('jsonwebtoken');

const app = express();

app.get('/test', function (req, res) {
    res.json({
        text: 'my api!'
    });
});

app.post('/test/login', function (req, res) {
    //auth user
    const user = {id: 8};
    const token = jwt.sign({user}, 'my_secret_key', {expiresIn: '1h'});
    res.json({
        token: token
    });
});

app.get('/test/protected', ensureToken, function (req, res) {
    res.json({
        text: 'this is protected!',
        data: req.data
    });
});

function ensureToken(req, res, next) {
    jwt.verify(req.headers["authorization"], 'my_secret_key', function (err,data) {
        if (err) {
            res.sendStatus(403);
        } else {
            req.data = data;
            next();
        }
    });
}

/!*app.get('/test/protected', ensureToken, function (req, res) {
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'this is protected!',
                data: data
            });
        }
    });
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}*!/

/!* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ *!/
app.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, 'my_secret_key', (err, decoded) => {
            // Check if error is expired or invalid
            if (err) {
                res.json({success: false, message: 'Token invalid: ' + err}); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
                next(); // Exit middleware
            }
        });
    }
});


app.get('/test/pro', (req, res) => {
    console.log(req.decoded.user.id);
    if (req.decoded.user) {
        res.json("Yo");
    } else {
        res.json("Huh");
    }
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
})
*/
