const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/Users.js');
const LunchDishes = require('../models/LunchDishes.js');
const isLoggedIn = require('../middlewares/isLoggenIn');
const isNotLoggedIn = require('../middlewares/isNotLoggedIn');
const LunchOrders = require('../models/LunchOrders')

router.get('/api/v1/users', isLoggedIn, (req,res,next) => {
    res.send(
       req.user.profile
    );
});

router.get('/api/v1/lunch', (req, res, next)=> {
    const startDate = '2018-03-26T00:00:00.000Z';
    const endDate = '2018-03-26T23:59:59.999Z';
    LunchDishes.find({date : {$gte: startDate, $lt: endDate }},(err,data)=> {
        res.send(data);
    })
});

router.post('/api/v1/lunch', isLoggedIn ,(req, res, next)=> {
    console.log(req.body);
    console.log(req.user);
    let order = new LunchOrders({user: req.user._id, dishes:req.body});
    order.save(function (err, order) {
        if (err) return console.error(err);
        console.log('save order');
      });

    LunchOrders.findOne({user: req.user._id}, (err , data) =>{
        if (err) return console.error(err);
        console.log(data);
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
});

const dataSave = () => {
    let dishes = new LunchDishes (
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Яйца фарширов ветчиной с хрено",
            description: "Яйцо 52гр,Ветчина,Лук репчатый,Сметана 25%,Хрен,Масло подсолн.,Петрушка,Соль",
            energyValue: "Белков 9.4 Жиров 14.6 Углеводов 2.4 Килокалорий 179.3"
        }
    );

    dishes.save(function (err, dishes) {
        if (err) return console.error(err);
        console.log("add data")
    });
};

    
module.exports = router;