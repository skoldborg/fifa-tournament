require('dotenv').config();

// Server / Node
const express = require ('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const destPath = path.join(__dirname, 'src');

// Webpack
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackCompiler = webpack(webpackConfig);

// Styles
const sassMiddleware = require('node-sass-middleware');
const nodeSassGlobbing = require('node-sass-globbing');
const postcssMiddleware = require('postcss-middleware');
const autoprefixer = require('autoprefixer');

// Setup express
app.use(bodyParser.json());
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

// Compile sass
app.use('/styles',
    sassMiddleware({
        src: __dirname + '/src/styles',
        dest: destPath,
        indentedSyntax: false,
        // Prevents file from being written to disk
        response: false,
        // Plugin to allow globbing of sass imports
        importer: nodeSassGlobbing,
        debug: false,
        // Vendor paths
        includePaths: [
            // './node_modules/library/scss'
        ]
    })
);

// Prefix and serve css
app.use('/styles', postcssMiddleware({
    plugins: [
        autoprefixer({
            browsers: ['last 3 versions', 'IE 9'],
            cascade: false
        })
    ],
    src: function(req) {
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

module.exports = app;
