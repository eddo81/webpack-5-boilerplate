const _RESOLVE = require('../utils/resolve');
const _PKG = require(`../../../package.json`);
const _EXTENSIONS = require('./extensions');
const _ENV = new (function() {
	this.debug =
		(process.env.NODE_ENV || 'development').trim().toLowerCase() !==
		'production'
			? true
			: false;
	this.mode = this.debug === true ? '"development"' : '"production"';
})();

const _DIRECTORIES = {
	root: _RESOLVE(),

	entry: new (function() {
		// Root
		this.build = 'src/';
		this.tools = `${this.build}tools/`;

		// Tools
		this.webpack = `${this.tools}webpack/`;

		// Assets
		this.images = `${this.build}images/`;
		this.media = `${this.build}media/`;
		this.fonts = `${this.build}fonts/`;
		this.scripts = `${this.build}scripts/`;
		this.styles = `${this.build}styles/`;
		this.static = `${this.build}static/`;
		this.icons = `${this.static}img/icons/`;
	})(),

	output: new (function() {
		this.assets = `wwwroot/`;
		this.js = `js/`;
		this.css = `css/`;
		this.media = `media/`;
		this.fonts = `fonts/`;
		this.images = `img/`;
	})()
};

const _CONFIG = {
	env: _ENV,
	directories: _DIRECTORIES,
	filename: `webpack.${_ENV.debug ? 'dev' : 'prod'}.conf.js`,
	extensions: _EXTENSIONS,
  package: _PKG,
  resolve: _RESOLVE
};

module.exports = _CONFIG;
