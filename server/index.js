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

app.use('/albume', albumRouter);
app.use('/photo', photoRouter)
app.use(authRouter);
app.use('/album_has_photos', albumPhotoRouter);

// Returneaza userul pentru autentificare n shit
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

app.listen(process.env.PORT || 5001, () => {
    console.log('Server runnin');
});