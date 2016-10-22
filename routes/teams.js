const Teams = require('../db');

const viewsDir = 'src/templates/views/';
const jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'index.jade'));

module.exports = {
    fetch: function(req, res) {
        Teams.find().exec(function(err, teams) {
            if(err) res.send(err);

            res.render(jadeTemplate, { title: 'Creuna Fifa Tournament', teams: teams });
        });
    },

    update: function(req, res) {
        var data = req.body;
        var homeTeam = data.homeTeam;
        var awayTeam = data.awayTeam;


    }
}