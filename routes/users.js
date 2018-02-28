const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/Users.js');

/* GET ALL Users */
router.get('/', function(req, res, next) {
    Users.find(function (err, results) {
    if (err) return next(err);
    res.send(results);
  });
});

module.exports = router;