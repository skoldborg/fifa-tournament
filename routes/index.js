'use strict';

const express = require('express');
const router = express.Router();
const Team = require('../db');
const teams = require('./teams');
const viewsDir = 'src/templates/views/';
const jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'index.jade'));

router.get('/', teams.fetch);

router.get('/result', (req, res) => {
    const jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'result.jade'));

    res.render(jadeTemplate, { title: 'Register result' });
});

router.post('/update', (req, res) => {
    let result = req.body;

    // update home team
    Team.findOne({ name: result.homeTeam }, function(err, team) {
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
    Team.findOne({ name: result.awayTeam }, function(err, team) {
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
});

router.get('/reset/:team', function(req, res) {
    Team.findOne({ name: req.params.team }, function(err, team) {
        team.stats = {
            gp: 0,
            w: 0,
            d: 0,
            l: 0,
            gf: 0,
            ga: 0
        }

        team.save(function(err) {
            if (err) throw err;

            res.redirect('/');
        });
    });
});

module.exports = router;
