const express = require('express');
const app = express();
const users = require('./routes/users');
const mongoose = require('mongoose');

//coneection to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/usersDatabase', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', users);

module.exports = app;