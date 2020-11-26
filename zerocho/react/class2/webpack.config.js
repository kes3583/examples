const path = require('path'); //노드가 깔려있으면 자동깔림
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js', //입력
    output: { //출력
        path: path.join(__dirname, 'dist'), //현재폴더안에 경로
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,                
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            targets: {
                            browsers: ['> 1% in KR'], // browserslist
                            },
                            debug: true,
                        }],'@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-jsx'],
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer', {}, ],
                                ],
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App 테스트!',
            template: 'index.html',
            filename: 'index.html'
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'), 
        publicPath: '/dist/',
        hot: true,      
    },
};