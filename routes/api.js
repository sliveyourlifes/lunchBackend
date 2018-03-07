const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');

router.get('/', (req,res,next) => {
  res.render('index');
})

router.get('/user',isLoggedIn, (req,res)=> {
  console.log(req.isAuthenticated())
    res.render('user', {
      user : req.user.profile // get the user out of session and pass to template
    });
})

router.get('/notAuthenticated', (req,res)=> {
    res.render('notAuthenticated');
})

//middleware for checking authentication user
function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated()) { return next() }
      
  res.redirect('/notAuthenticated');
}

module.exports = router;