const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');

router.get('/', isLoggedIn, (req,res,next) => {
    res.json({
      user: req.user.profile
    });
});

router.get('/not-authenticated', isNotLoggedIn, (req,res) => {
    res.render('not-authenticated');
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/not-authenticated');
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) { return next() }
  res.redirect('/');
}

module.exports = router;