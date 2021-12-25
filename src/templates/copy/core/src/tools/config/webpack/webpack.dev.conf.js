const _CONFIG = require('../index.js');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const WriteFilePlugin = require('write-file-webpack-plugin');

let webpackConfig = merge(baseWebpackConfig, {
	devtool: 'eval-cheap-module-source-map',

	watch: true,

	stats: 'minimal',

	output: {
		chunkFilename: `${_CONFIG.directories.output.js}[name].js`,
		pathinfo: true
	},

	plugins: [
		new WriteFilePlugin()
	]
});

module.exports = webpackConfig;
