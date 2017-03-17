const http = require('http');
const mongoose = require('mongoose');
const moment = require('moment');
const uristring = 'mongodb://heroku_1qfr6rj6:ktohh2n3lstvohakdtkajj66p9@ds061196.mlab.com:61196/heroku_1qfr6rj6';
const dbPort = 5000;

const Season = require('../database/seasons');

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('error connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('succeeded connected to: ' + uristring);
    }
});

// // Create new team
// var arsenal = new Team({
//     player: 'Pierre',
//     name: 'Arsenal',
//     image: '../images/arsenal.png',
//     stats: {
//         'gp': 0,
//         'w': 0,
//         'd': 0,
//         'l': 0,
//         'gf': 0,
//         'ga': 0
//     }
// });

// // Save to database
// arsenal.save(function (err) {if (err) console.log ('error')});

const seasonOne = new Season({
    date: moment(Date.now()).format('YYYY-DD-MM'),
    teams: [
        {
            "player": "Pierre",
            "name": "Bayern München",
            "image": "../images/bayern.png",
            "stats": {
                "gp": 18,
                "w": 8,
                "d": 3,
                "l": 7,
                "gf": 30,
                "ga": 26
            }
        },
        {
            "player": "Dave",
            "name": "Real Android",
            "image": "../images/realmadrid.png",
            "stats": {
                "gp": 14,
                "w": 7,
                "d": 3,
                "l": 4,
                "gf": 34,
                "ga": 26
            }
        },
        {
            "player": "Martin",
            "name": "Liverpool FC",
            "image": "../images/liverpool.png",
            "stats": {
                "gp": 19,
                "w": 2,
                "d": 4,
                "l": 13,
                "gf": 13,
                "ga": 33
            }
        },
        {
            "player": "Phil",
            "name": "Chelsea",
            "image": "../images/chelsea.png",
            "stats": {
                "gp": 20,
                "w": 10,
                "d": 4,
                "l": 6,
                "gf": 36,
                "ga": 28
            }
        }
    ]
});

seasonOne.save(function(err) { if (err) console.log(err); })