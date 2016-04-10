var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app.js',
    devtool: 'source-map',
    output: {path: __dirname, filename: 'htdocs/bundle.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};
