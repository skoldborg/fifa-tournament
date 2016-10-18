require('dotenv').config();

// Server / Node
const express = require ('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const destPath = path.join(__dirname, 'src');

// Webpack
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackCompiler = webpack(webpackConfig);

// Styles
const sassMiddleware = require('node-sass-middleware');
const nodeSassGlobbing = require('node-sass-globbing');
const postcssMiddleware = require('postcss-middleware');
const autoprefixer = require('autoprefixer');

// Setup express
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine to jade
app.set('view engine', 'jade');

// Routes
app.use(require('./routes'));

// Set up Webpack dev middleware
app.use(webpackDevMiddleware(webpackCompiler,
    {
        noInfo: false,
        publicPath: webpackConfig.output.publicPath
    }
));

// Set up Webpack hot reloading
app.use(webpackHotMiddleware(webpackCompiler, { log: console.log }));

// Compile sass
app.use( '/styles',
    sassMiddleware({
        src: __dirname + '/src/styles',
        dest: destPath,
        indentedSyntax: true,
        // Prevents file from being written to disk
        response: false,
        // Plugin to allow globbing of sass imports
        importer: nodeSassGlobbing,
        debug: true,
        // Vendor paths
        includePaths: [
            // './node_modules/foundation-sites/scss'
        ]
    })
);

app.use('/styles', postcssMiddleware({
    plugins: [
        autoprefixer({
            browsers: ['last 2 versions', 'IE 9'],
            cascade: false
        })
    ],
    src: function(req) {
        console.log(path.join(destPath, req.url));
        return path.join(destPath, req.url);
    }
}));

// Start server
const port = process.env.PORT || 3001;
app.use(express.static('./src'));

app.listen(port, function(error){
    if(error) throw error;
    console.log("Express server listening on port: ", port);
});
