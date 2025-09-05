const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { rawListeners } = require('process');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { Extension } = require('typescript');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    console.log('isProd >>>', isProd)

    return {
        mode: isProd ? 'production' : 'development',
        entry: './src/index.tsx',
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
            new ESLintPlugin({
                extensions: ['.ts', '.js', '.tsx', '.jsx'],
                failOnError: true,
            }),
            ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [])
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/i,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.(ts|tsx)$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-typescript',
                                    "@babel/preset-react"
                                ]
                            }
                        },
                        'ts-loader',
                    ],
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: ['style-loader', 'css-loader'],
                    use: [miniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
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
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            hot: true,
            open: true,
            port: 9000,
            liveReload: true,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx']
        }
    };
};