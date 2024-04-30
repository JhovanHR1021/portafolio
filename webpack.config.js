const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./index.js'],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: false
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource'
            }
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },

}

/*
npm install --save-dev html-webpack-plugin
html-webpack-plugin clean-webpack-plugin css-minimizer-webpack-plugin terser-webpack-plugin css-minimizer-webpack-plugin

npm install --save-dev html-loader css-loader
 */