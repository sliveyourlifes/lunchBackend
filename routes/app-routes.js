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

let saveData = () => {
    let menu = new Dinners({menuList:[
        {
            name: "Салат Цезарь",
            description: "Филе цыпленка,Томаты,Сыр,Батон,Масло подсолн.,Горчица франц,Соус соевый,Майонез,Салат айсберг,Яйцо 52гр,Лимон,Вода,Приправа паприка,Приправа для курицы,Соль",
            energy_value: "Белков 11.3 Жиров 20.1 Углеводов 7.4 Килокалорий 257.9"
        },
        {
            name: "Сельдь под шапкой",
            description: "Сельдь филе матиас,Яблоко,Лук репчатый,Петрушка,Майонез,Уксус столовый,Соль,Картофель,Перец черный",
            energy_value: "Белков 11.6 Жиров 18.2 Углеводов 21.3 Килокалорий 296.7"
        },
        {
            name: "Салат Праздничный",
            description: "Морковь,Масло подсолн.,Лук репчатый,Огурцы консерв.,Майонез,Петрушка,Свинина тазобедр.",
            energy_value: "Белков 1.7 Жиров 5.1 Углеводов 16.1 Килокалорий 94.1"
        },
        {
            name: "Салат из белокочанной капусты",
            description: "Капуста белокоч,Морковь,Уксус столовый,Сахар,Масло подсолн.,Соль,Петрушка,Перец черный",
            energy_value: "Белков 11.3 Жиров 20.1 Углеводов 7.4 Килокалорий 257.9"
        },
        {
            name: "Салат из св помидор и яблок",
            description: "Томаты,Яблоко,Сметана 25%,Петрушка,Капуста пекин",
            energy_value: "Белков 1.3 Жиров 5.2 Углеводов 5.3 Килокалорий 75.9"
        },
        {
            name: "Салат из свеклы со св огурцом",
            description: "Свекла,Огурцы св.,Яйцо 52гр,Лук репчатый,Майонез,Петрушка,Соль",
            energy_value: "Белков 3.9 Жиров 15.8 Углеводов 4.8 Килокалорий 176.7"
        },
        {
            name: "Салат-коктейль Березка",
            description: "Чернослив,Лук репчатый,Огурцы св.,Яйцо 52гр,Майонез,Петрушка,Филе цыпленка,Шампиньоны",
            energy_value: "Белков 8.6 Жиров 14.9 Углеводов 9.9 Килокалорий 209.5"
        },
        {
            name: "Яйца фарширов ветчиной с хрено",
            description: "Яйцо 52гр,Ветчина,Лук репчатый,Сметана 25%,Хрен,Масло подсолн.,Петрушка,Соль",
            energy_value: "Белков 9.4 Жиров 14.6 Углеводов 2.4 Килокалорий 179.3"
        }
    ]})

    menu.save(function (err, menu) {
        if (err) return console.error(err);
        console.log("add data")
      });

    }
module.exports = router;