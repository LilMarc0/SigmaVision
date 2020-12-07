const express = require("express");
const cors = require("cors");



var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    next();
}

const bodyParser = require("body-parser")
require('dotenv').config();

// APP
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());
app.use(corsMiddleware);

// middlewares
const middlewares = require('./middlewares/auth');
app.use(middlewares.checkTokenSetUser)

// routers
const albumRouter = require('./routes/album');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const albumPhotoRouter = require('./routes/album_photos');
const photoRouter = require('./routes/photo');
const miscRouter = require('./routes/misc');
const msgRouter = require('./routes/message');


app.use('/albume', albumRouter);
app.use('/photo', photoRouter)
app.use(authRouter);
app.use('/album_has_photos', albumPhotoRouter);
app.use('/misc', miscRouter);
app.use('/message', msgRouter);

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minut
  max: 50
});
app.use(limiter);


// Returneaza userul pentru autentificare
app.get('/me', (req, res) => {
    try{
        console.log('----')
        console.log(req.user)
        res.send({
            user: req.user
        })
    }catch(err){
        console.log('---me ', err);
    }

});

app.listen(5001, '192.168.1.222', () => {
    console.log('Server runnin');
});