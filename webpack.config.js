'use strict';

const webpack = require('webpack');
const js_path = '/front_end/js';
const DEV_ENV = true;

module.exports = {
	context: __dirname + js_path,	// path for entries
	// take js files
	entry: {
		home: 'home.js',
		about: 'about.js',
	},
	// output compiled js
	output: {
		path: __dirname + '/public/js',
		publicPath: './js/',	//to get files via url
		filename: "[name].js",	// temp;ate where name will be replaced by key name from 'entry'
		library: "[name]"
	},

	// where to search for entries and which extensions
	resolve: {
		modules: ['node_modules','./'],
		extensions: ['.js']
	},

	watch: true,

	// time after changes were detected and before start compiling
	watchOptions: {
		aggregateTimeout: 100
	},

	// for debugging
	devtool: "cheap-inline-source-map",

	plugins: [
		// Plugin to insert variables inside the project
		new webpack.DefinePlugin({
			DEV_ENV : DEV_ENV
 		}),

		// Plugin to separate js in separate file scripts that resused in "entries"
 		new webpack.optimize.CommonsChunkPlugin({
 			name: "common",
 			minChunks: 2,	// how many times should be function reused
 		})
	],

	module : {
		// Setup loaders
		loaders: [{
			// babel loader for parsing ES6
			// https://github.com/babel/babel-loader
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: [/node_modules/],
			options: {
				presets: ['env'],
		        plugins: ['transform-runtime'] // setup extra plugins for loaders
		     }
		},
		{
			test: /\.jade$/,
			loader: 'jade-loader'
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader!autoprefixer?browsers=last 2 versions'
		},
		{
			test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      		loader: 'file?name=[path][name].[ext]'
		}
		]
	}
}

if( DEV_ENV ){
// For dev environment

}else{
// For prod environment

	// Plugin to minify js
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
 			compress:{
 				// do not show unreachable variables etc
 				warnings: false,
 				drop_console: true,
 				unsafe: true
 			}
 		})
	);

	// Plugin in order to not create files with errors
	module.exports.plugins.push(
		new webpack.NoErrorsPlugin()
	);

}