const rm = require('rimraf');
const _CONFIG = require('./config');
const _ASSETS_SUBFOLDERS = [
	_CONFIG.directories.output.js,
	_CONFIG.directories.output.css,
	_CONFIG.directories.output.fonts,
	_CONFIG.directories.output.images,
];

_ASSETS_SUBFOLDERS.forEach((subfolder) => {
	rm(_CONFIG.resolve(_CONFIG.directories.output.assets + subfolder), err => {
		if (err) {
			throw err;
		}
	});
});
