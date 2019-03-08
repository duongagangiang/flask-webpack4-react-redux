const path = require('path');
const HWP = require('html-webpack-plugin');
const ETWP = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const APP_DIR = path.join(__dirname, './src');
const BUILD_DIR = path.join(__dirname, '../app/static');
module.exports = {
    entry: APP_DIR + '/index.js',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: BUILD_DIR,
        publicPath: '/'
    },
    optimization: {
        minimizer: [
          // we specify a custom UglifyJsPlugin here to get source maps in production
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true,
              warnings: false
            },
            sourceMap: true
          })
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    }
                }
            }
        },
        runtimeChunk: 'single',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ETWP.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            })
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
            use: 'file-loader'
        }]
    },
    devServer: {
        historyApiFallback: {
            index: BUILD_DIR
        },
    },
    plugins: [
        new HWP(
            {
                filename: BUILD_DIR + '/templates/index.html',
                template: APP_DIR + '/index.html'
            }
        ),
        new ETWP('css/style.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'Tether': 'tether'
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    devtool: 'inline-source-map'
}