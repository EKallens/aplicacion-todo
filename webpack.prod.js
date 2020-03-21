const HtmlWebpackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {

    mode:'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ] // Cuando está en prod deja el css minificado
    },
    output: {
        filename: 'main[contentHash].js'
    },
    module: {
        rules: [
            {   test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ] },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name][contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]

}