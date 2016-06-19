var fs = require("fs");
var path = require('path');
var webpack = require('webpack');
var srcDir = path.join(__dirname, 'src');
var appDir = path.join(__dirname, 'app');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var DirectoryNameAsMain = require('webpack-directory-name-as-main');

var environment = process.env.NODE_ENV || "development";
var minimize = process.argv.indexOf('--minimize') >= 0;
var watch = process.argv.indexOf('--no-watch') < 0;
var sourceMap = process.argv.indexOf('--source-map') >= 0;

var provided = {
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    "Web3": "web3",
    "Pudding": "ether-pudding",
    "Promise": "bluebird"
};

var contracts_directory = path.join("./", "environments", environment, "contracts");
fs.readdirSync("./environments/" + environment + "/contracts").forEach(function(file) {
    if (path.basename(file).indexOf(".sol.js")) {
        provided[path.basename(file, ".sol.js")] = path.resolve(contracts_directory + "/" + file);
    }
});

var config = {
    entry: './app/javascripts/app.js',
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ResolverPlugin([
            new DirectoryNameAsMain()
        ]),
        new webpack.ProvidePlugin(provided),
        new webpack.DefinePlugin({
            ENV: '"' + process.env.NODE_ENV + '"',
            WEB3_PROVIDER_LOCATION: '"' + process.env.WEB3_PROVIDER_LOCATION + '"'
        }),
        new CopyWebpackPlugin([
            { from: './app/index.html', to: "index.html" },
            { from: './app/images', to: "images" }
        ])
    ],
    output: {
        path: "./environments/" + environment + "/build",
        filename: 'app.js'
    },
    resolve: {
        root: path.resolve(srcDir),
        modulesDirectories: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js'],
        alias: {
            'jquery': 'jquery/dist/jquery.js',
            'react-bootstrap': 'react-bootstrap/dist/react-bootstrap.js',
            'babel-polyfill': path.join(__dirname, 'babel-polyfill/dist/polyfill.js'),
            'contracts': path.join(__dirname, 'environments/'+ environment + '/contracts')
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx|es6)$/,
                exclude: /(node_modules|contracts)/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    `css!autoprefixer-loader?{browsers:["last 2 versions","> 5%"]}!sass-loader?includePaths[]=` + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
                )
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    `css!autoprefixer-loader?{browsers:["last 2 versions","> 5%"]}!less`
                )
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { test: /\.json/, loader: "json-loader" },
            { test: /\.(jpg|png|gif)$/, loader: "file-loader?name=images/[name].[ext]" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" }
        ]
    }
};

minimize && config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
        except: ['$super', '$', 'exports', 'require']
    }
}));

module.exports = config;

