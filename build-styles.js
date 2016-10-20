var sass = require('node-sass');
var globImporter = require('sass-glob-importer');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var fs = require('fs');
var path = require('path');

var devPath = path.join(__dirname, 'src/styles/');
var distPath = path.join(__dirname, 'build/assets/');

sass.render({
  file: path.join(devPath, 'main.scss'),
  outfile: path.join(distPath, 'main.css'),
  importer: globImporter()
}, function(err, result) {
    if (!err) {
        fs.writeFile(path.join(distPath, 'main.css'), result.css, function(err){
            if(!err){
                console.log('sass compilation successful');
            } else {
                console.log(err);
            }
        });
    }
});

postcss(autoprefixer, cssnano])
    .process(css, { from: 'src/app.css', to: 'app.css' })
    .then(function (result) {
        fs.writeFileSync('app.css', result.css);
        if ( result.map ) fs.writeFileSync('app.css.map', result.map);
    });
