const mongoose = require('mongoose');

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

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;