const _CONFIG = require('./src/tools/config');
const autoprefixer = require('autoprefixer');
const postcssimport = require('postcss-import');
const postcssnested = require('postcss-nested');
const postcsscurrentselector = require('postcss-current-selector');
const postcsscalc = require('postcss-calc');
const postcsspreset = require('postcss-preset-env');
const objectfitimages = require('postcss-object-fit-images');
<% if(tailwind !== false) { -%>
const tailwindcss = require('tailwindcss');<% } -%>

module.exports = {
	plugins: [
		postcssimport({ path: ["src/styles"] }),
		postcssnested,
		postcsscurrentselector({ "symbol": "&" }),
    <% if(tailwind !== false) { -%>tailwindcss('./tailwind.js'),<% } -%>
		postcsscalc,
		(_CONFIG.env.debug) ? undefined : autoprefixer,
		postcsspreset,
		objectfitimages
	]
}
