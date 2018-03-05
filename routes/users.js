const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');

router.get('/', (req,res,next) => {
  res.render('index');
})

router.get('/auth/yandex',
  passport.authenticate('yandex'),
  function(req, res){
    // The request will be redirected to Yandex for authentication, so this
    // function will not be called.
});

router.get('/auth/yandex/callback',
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

// router.get('/user', (req,res,next)=> {
//   Users.findById(req.session.passport.user, (err,user)=> {
//     if(err) return new Error (err)
//     // console.log( user.profile);
//     const account = JSON.parse(user.profile);
//     console.log(account);
//     res.render('index', {user: user.profile});
//   })
//   next();
// })



module.exports = router;

