const mongoose = require('mongoose');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(uri, {
    dbName: DB_NAME,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.error(e));