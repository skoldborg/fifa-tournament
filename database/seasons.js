const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    date: String,
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

module.exports = Season;