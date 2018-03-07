const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/auth/yandex', passport.authenticate('yandex'), function(req, res){
    // The request will be redirected to Yandex for authentication, so this
    // function will not be called.
});

router.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/notAuthenticated' }), function(req, res) {
  res.redirect('/user');
});

module.exports = router;