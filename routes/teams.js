const path = require('path');
const Teams = require('../db');

const viewsDir = 'src/templates/views/';
const jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'index.jade'));

module.exports = {
    fetch: function(req, res) {
        Teams.find().exec(function(err, teams) {
            if(err) res.send(err);

            res.render(jadeTemplate, { title: 'Creuna Fifa League', teams: teams });
        });
    },

    update: function(req, res) {
        let result = req.body;

        // update home team
        Teams.findOne({ name: result.homeTeam }, function(err, team) {
            if (err) throw err;

            let updatedStats = {
                gp: team.stats.gp + 1,
                w: team.stats.w,
                d: team.stats.d,
                l: team.stats.l,
                gf: team.stats.gf + parseInt(result.homeScore),
                ga: team.stats.ga + parseInt(result.awayScore)
            };

            if (result.homeScore > result.awayScore) {
                updatedStats['w'] = team.stats.w += 1;
            } else if (result.homeScore === result.awayScore) {
                updatedStats['d'] = team.stats.d += 1;
            } else {
                updatedStats['l'] = team.stats.l += 1;
            }

            team.stats = updatedStats;

            team.save(function(err) {
                if (err) throw err;
            });
        });

        // update away team
        Teams.findOne({ name: result.awayTeam }, function(err, team) {
            if (err) throw err;

            let updatedStats = {
                gp: team.stats.gp + 1,
                w: team.stats.w,
                d: team.stats.d,
                l: team.stats.l,
                gf: team.stats.gf + parseInt(result.awayScore),
                ga: team.stats.ga + parseInt(result.homeScore)
            };

            if (result.homeScore > result.awayScore) {
                updatedStats['l'] = team.stats.l += 1;
            } else if (result.homeScore === result.awayScore) {
                updatedStats['d'] = team.stats.d += 1;
            } else {
                updatedStats['w'] = team.stats.l += 1;
            }

            team.stats = updatedStats;

            team.save(function(err) {
                if (err) throw err;
            });
        });

        res.redirect('/result');
    }
}