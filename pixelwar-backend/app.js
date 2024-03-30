const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

require('dotenv').config();

// open config.json and inject the values into process.env
const mongo = require('./databases/mongo');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./routes/auth'));
app.use('/board', require('./routes/board'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));

module.exports = app;
