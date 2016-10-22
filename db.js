require('dotenv').config();

var http = require('http');
var mongoose = require('mongoose');

var uristring = process.env.MONGODB_URI;
var port = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('error connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('succeeded connected to: ' + uristring);
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

var matchSchema = new mongoose.Schema({
    home: {
        team: String,
        goals: Number
    },
    away: {
        team: String,
        goals: Number
    }
});

var Teams = mongoose.model('teams', teamSchema);

module.exports = Teams;