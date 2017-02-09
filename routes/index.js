'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const Teams = require('../db');
const teams = require('./teams');
const viewsDir = 'src/templates/views/';

router.get('/', teams.fetch);

router.get('/result', (req, res) => {
    let jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'result.jade'));
    
    Teams.find().exec(function(err, teams) {
        if(err) res.send(err);

        res.render(jadeTemplate, { title: 'Register result', teams: teams });
    });
});

router.post('/update', teams.update);

router.get('/reset/:team', function(req, res) {
    Teams.findOne({ name: req.params.team }, function(err, team) {
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
