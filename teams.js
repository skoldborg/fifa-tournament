require('dotenv').config();

var http = require('http');
var mongoose = require('mongoose');

var uristring = process.env.MONGODB_URI;
var port = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var teamSchema = new mongoose.Schema({
    player: String,
    name: String,
    image: String,
    stats: {
        gp: Number,
        w: Number,
        d: Number,
        l: Number,
        gf: Number,
        ga: Number
    }
});

var Teams = mongoose.model('teams', teamSchema);


// Create new team
// var dortmund = new Team({
//     player: 'Carl',
//     name: 'Bor. Dortmund',
//     image: '../images/dortmund.png',
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
// dortmund.save(function (err) {if (err) console.log ('error')});



// var matchSchema = new mongoose.Schema({
//     home: String,
//     away: String,
//     score: {
//         home: Number,
//         away: Number
//     },
//     winner: String
// });