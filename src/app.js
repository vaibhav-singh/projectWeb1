'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.CONNECTION_STRING, {useNewUrlParser: true}).catch(error => console.error(error));;


mongoose.connection.on('error',function (err){
    console.log("database connection error:");
    console.log(err);
})

//handling connection success

mongoose.connection.on('open',function (err){
    if(err){
        console.log("database connection error:");
        console.log(err); 
    }else{
        console.log("database connected successfully");
    }
})
//load models
const User = require('./models/user');

//load routes
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extentend: false }));

// Enable CORS ()
if(config.MODE == 'development') {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
}

app.use('/', indexRoute);
app.use('/users', userRoute);

module.exports = app;