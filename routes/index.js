'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const Teams = require('../db');
const teams = require('./teams');
const viewsDir = 'src/templates/views/';

// File storage
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


router.get('/', teams.fetch);

router.get('/result', (req, res) => {
    let jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'result.jade'));
    
    Teams.find().exec(function(err, teams) {
        if(err) res.send(err);

        res.render(jadeTemplate, { title: 'Register result', teams: teams });
    });
});

router.get('/addTeam', (req, res) => {
    let jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'addTeam.jade'));

    res.render(jadeTemplate, { title: 'Add team'});
});

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

router.post('/update', teams.update);

router.post('/addTeam', upload.single('teamLogo'), teams.add);

module.exports = router;
