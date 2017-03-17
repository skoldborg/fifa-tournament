require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');

const uristring = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('error connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('succeeded connected to: ' + uristring);
    }
});

const teamSchema = new mongoose.Schema({
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

const matchSchema = new mongoose.Schema({
    home: {
        team: String,
        goals: Number
    },
    away: {
        team: String,
        goals: Number
    }
});

const seasonSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    teams: [{
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
    }]
})

const Season = mongoose.model('seasons', seasonSchema);

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;