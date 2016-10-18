var path = require('path');
var webpack = require('webpack');

module.exports = function(){

    var config = {
        watch: true,
        entry: [
            path.resolve('src/scripts/main'),
            'webpack-hot-middleware/client',
            'webpack/hot/dev-server'
        ],
        output: {
            path: path.resolve('./build'),
            filename: 'bundle.js',
            publicPath: ''
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        resolve: {
            extensions: ['', '.js']
        }
    };

    return config;
}();
