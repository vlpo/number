const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const OUTPUT_FOLDER = 'dist';
const HTMLS_PATH = './src/';
const JS_PAGES_PATH = './src/pages/';
const htmls = [];
let pages = {};

/** READ HTML PAGES */
fs.readdirSync(HTMLS_PATH).forEach(file => {
    const ext = path.extname(file).slice(1);
    if (ext === 'html') {
        htmls.push(path.basename(file, `.${ext}`));
    }
});

/** READ JS PAGES */
fs.readdirSync(JS_PAGES_PATH).forEach(file => {
    const ext = path.extname(file);
    const page_name = path.basename(file, ext);

    pages = {
        ...pages,
        [page_name]: `${JS_PAGES_PATH}${file}`,
    };
});

module.exports = {
    entry: { ...pages },
    output: {
        path: path.resolve(__dirname, OUTPUT_FOLDER),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        beautify: false,
                        comments: false,
                    },
                    mangle: {
                        keep_fnames: false,
                    },
                    sourceMap: true,
                    ie8: false,
                    warnings: false,
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmls.reduce((acc, value) => {
            acc.push(new HtmlWebpackPlugin({
                filename: `${value}.html`,
                template: `./src/${value}.html`,
                chunks: [value]
            }));
            return acc;
        }, []),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('styles/[name].css').replace('styles/', 'css/');
            },
            allChunks: true
        }),
    ]
};