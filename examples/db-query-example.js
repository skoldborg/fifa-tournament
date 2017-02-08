// Create new team
var arsenal = new Team({
    player: 'Pierre',
    name: 'Arsenal',
    image: '../images/arsenal.png',
    stats: {
        'gp': 0,
        'w': 0,
        'd': 0,
        'l': 0,
        'gf': 0,
        'ga': 0
    }
});

// Save to database
arsenal.save(function (err) {if (err) console.log ('error')});
