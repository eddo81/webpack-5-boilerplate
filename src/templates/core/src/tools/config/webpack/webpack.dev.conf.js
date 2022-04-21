const _CONFIG = require('../index.js');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

let webpackConfig = merge(baseWebpackConfig, {
	devtool: 'eval-cheap-module-source-map',

	watch: true,

  watchOptions: {
    ignored: [`**/${_CONFIG.directories.assets}`, '**/node_modules'],
  },

	stats: 'minimal',

	output: {
		chunkFilename: `${_CONFIG.directories.output.js}[name].js`,
		pathinfo: true
	}
});

module.exports = webpackConfig;
