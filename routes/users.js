const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');

/* GET ALL Users */
// router.get('/', function(req, res, next) {
//     Users.find(function (err, results) {
//     if (err) return next(err);
//     res.send(results);
//   });
// });

router.get('/', (req,res,next) => {
  //const userId = req.session.userId;
  console.log(req.session)
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


module.exports = router;

