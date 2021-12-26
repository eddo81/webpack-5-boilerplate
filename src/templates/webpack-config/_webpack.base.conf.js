const _CONFIG = require('../index.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

console.log(`building for ${_CONFIG.env.mode}...\n`);

let baseConfig = {
	mode: JSON.parse(_CONFIG.env.mode),

	entry: {
		main: [
			_CONFIG.resolve(`${_CONFIG.directories.entry.scripts}/main.js`),
			<% if(tailwind !== false) { -%>
			_CONFIG.resolve(`${_CONFIG.directories.entry.styles}/tailwind.css`),<% } -%>
			_CONFIG.resolve(`${_CONFIG.directories.entry.styles}/main.css`)
		]
	},

	output: {
		path: _CONFIG.resolve(_CONFIG.directories.output.assets),
		filename: `${_CONFIG.directories.output.js}[name]${_CONFIG.env.debug ? '' : '.[chunkhash]'}.js`,
	},

	resolve: {
		extensions: ['.css', '.js', '.json'],
		alias: {
			wwwroot: _CONFIG.resolve(_CONFIG.directories.entry.build)
		}
	},

	module: {
		rules: [{
			test: _CONFIG.extensions.js,
			exclude: /node_modules/,
			use: 'babel-loader',
			include: [_CONFIG.resolve(_CONFIG.directories.entry.scripts)]
		},

		{
			test: _CONFIG.extensions.images,
			type: 'asset/resource',
			generator: { filename: `${_CONFIG.directories.output.images}[hash][ext][query]` }
		},

		{
			test: _CONFIG.extensions.media,
			type: 'asset/resource',
			generator: { filename: `${_CONFIG.directories.output.media}[hash][ext][query]` }
		},

		{
			test: _CONFIG.extensions.fonts,
			type: 'asset/resource',
			generator: { filename: `${_CONFIG.directories.output.fonts}[hash][ext][query]` }
		},

		{
			test: _CONFIG.extensions.css,
			use: [{
				loader:  MiniCssExtractPlugin.loader
			},
			{
				loader: 'css-loader',
				options: { sourceMap: _CONFIG.env.debug ? false : true }
			},
			{
				loader: 'postcss-loader',
				options: { sourceMap: _CONFIG.env.debug ? false : true }
			}]
		}]
	},

	externals: {},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: _CONFIG.env.mode }
		}),

		new ESLintPlugin({
			emitError: true,
			emitWarning: true,
			failOnError: true,
			extensions: ['js'],
			overrideConfigFile: _CONFIG.resolve('/.eslintrc.js')
		}),

		new MiniCssExtractPlugin({
			filename: `${_CONFIG.directories.output.css}[name]${
				_CONFIG.env.debug ? '' : '.[contenthash]'
				}.css`,
			chunkFilename: '[id].[contenthash].css'
		}),

		new CopyWebpackPlugin({
			patterns: [{
				from: _CONFIG.resolve(_CONFIG.directories.entry.static.replace(/\/$/, '')),
				to: '',
				globOptions: {
					ignore: ['**/.gitkeep']
				}
			}]
		})
	]
};

module.exports = baseConfig;