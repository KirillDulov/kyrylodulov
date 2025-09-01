const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { rawListeners } = require('process');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'images/[name].[contenthash][ext]'
    },
    mode: 'development',
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
        }),
        new miniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                use: [miniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                }
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            webp: {
                                quality: 75,
                            },
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,

            new CssMinimizerPlugin(),

        ],
        minimize: true,
    },
}