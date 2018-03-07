const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');
const isLoggedIn = require('../middlewares/isLoggenIn');
const isNotLoggedIn = require('../middlewares/isNotLoggedIn');

router.get('/', isLoggedIn, (req,res,next) => {
    res.json({
      user: req.user.profile
    });
});

router.get('/not-authenticated', isNotLoggedIn, (req,res) => {
    res.render('not-authenticated');
})

module.exports = router;