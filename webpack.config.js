const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const modeDev = process.env.NODE_ENV !== 'production'
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: modeDev ? 'development' : 'production',
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist'
    },
    devServer: {
        contentBase: "./dist",
        port: 3000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",   
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [ 'file-loader' ]
        }]
    }
}