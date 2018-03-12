const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');
const Dinners = require('../models/Dinners.js');
const isLoggedIn = require('../middlewares/isLoggenIn');
const isNotLoggedIn = require('../middlewares/isNotLoggedIn');

router.get('/api/v1/users', isLoggedIn, (req,res,next) => {
    res.send(
       req.user.profile
    );
});

router.get('/api/v1/lunch', (req, res, next)=> {

    Dinners.find({}, (err, data) => {
        res.send(data);
    });
})


router.get('/', isLoggedIn, (req,res,next) => {
    res.send(
       req.user.profile
    );
});

router.get('/not-authenticated', isNotLoggedIn, (req,res) => {
    res.render('not-authenticated');
})

module.exports = router;