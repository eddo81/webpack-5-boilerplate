const _CONFIG = require('./src/tools/config');
const purgecss = require('@fullhuman/postcss-purgecss');
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
    <% if(tailwind !== false) { -%>
		tailwindcss('./src/tools/config/tailwind/tailwind.js'),<% } -%>
		(_CONFIG.env.debug) ? undefined : purgecss({
			content: ['./**/*.html', './**/*.json', './**/*.css' ],
			whitelistPatternsChildren: [],
			defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
		}),
		postcsscalc,
		(_CONFIG.env.debug) ? undefined : autoprefixer,
		postcsspreset,
		objectfitimages
	]
}
