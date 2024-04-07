const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
var expressWs = require('express-ws')(app);

require('dotenv').config();

// open config.json and inject the values into process.env
const mongo = require('./databases/mongo');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.ws('/boards-ws/:id', require('./routes/board_ws').handle);
app.use('/auth', require('./routes/auth'));
app.use('/boards', require('./routes/board'));
app.use('/users', require('./routes/user'));
app.use('/dashboard', require('./routes/dashboard'));

module.exports = app;
