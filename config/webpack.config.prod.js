const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'js/[name]-[contenthash:4].js',
        path: path.resolve(__dirname, '../', 'build'),
    },
    devtool: 'eval-cheap-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:4].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'new app',
            template: 'src/templates/template.html',
        }),
        new CopyPlugin({
            patterns: [{ from: 'public/data', to: 'data' }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
                //   use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash:4].[ext]',
                            outputPath: 'images',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 70,
                                progressive: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            { useBuiltIns: 'usage', corejs: '3.0.0' },
                        ],
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
        ],
    },
};
