const path = require('path');
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    watch: true,
    entry: [ path.join(__dirname, 'src/js/app.js'), path.join(__dirname, 'src/scss/app.scss')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/app.js',
        publicPath: '/dist'
    },
    module: {
        rules: [{
              test: /\.vue$/,
              loader: 'vue-loader',
              exclude: path.resolve(__dirname, 'node_modules'),
              options: {
                loaders: {
                  scss: ExtractTextPlugin.extract({
                      use: 'css-loader!sass-loader',
                      fallback: 'vue-style-loader'
                  }),
                }
              },
            }
            ,{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules(?!\/(foundation-sites|dom7|swiper))/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                      use: 'css-loader!sass-loader',
                      fallback: 'style-loader'
                  })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                      use: 'css-loader!sass-loader',
                      fallback: 'style-loader'
                  })
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                loader: 'file-loader?name=/fonts/[name].[ext]',
                include: path.resolve(__dirname, 'src/fonts'),
            },{
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'file-loader?name=/media/[name].[ext]',
                include: path.resolve(__dirname, 'src/media'),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/app.css'),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // })
    ],

    resolve: {
        alias: {
            
        }
    },
    externals: {
        
    },
    devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#eval-source-map'
}

// start live server
var liveServer = require("live-server");
var params = {
    port: 8000, // Set the server port. Defaults to 8080.
    // root: "", Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    logLevel: 1, // 0 = errors only, 1 = some, 2 = lots
    ignore: './node_modules,./.git'
};
liveServer.start(params);