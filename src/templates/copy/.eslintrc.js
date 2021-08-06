module.exports = {
	"root": true,
	"parser": "babel-eslint",
	"parserOptions": {
		"sourceType": "module"
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"amd": true,
		"jquery": true
	},
	"globals": {
		"jQuery": "readonly"
	},
	"extends": ["eslint:recommended"],
	"plugins": ["html"],
	"settings": {
		"import/ignore": ["node_modules", "\\.(coffee|scss|css|less|hbs|svg|json)$"]
	},
	"rules": {
		"arrow-parens": 0,
		"generator-star-spacing": 0,
		"no-console": process.env.NODE_ENV !== 'production' ? 0 : "warn",
		"no-unused-vars": "warn"
	}
};
