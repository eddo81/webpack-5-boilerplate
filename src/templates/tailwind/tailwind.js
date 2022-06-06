const plugin = require('tailwindcss/plugin');

const px = {
  '1px': '1px',
  '2px': '2px',
  '3px': '3px',
  '4px': '4px',
  '5px': '5px',
  '6px': '6px',
  '7px': '7px',
  '8px': '8px',
  '9px': '9px',
  '10px': '10px',
  '11px': '11px',
  '12px': '12px',
  '13px': '13px',
  '14px': '14px',
  '15px': '15px',
  '16px': '16px',
  '17px': '17px',
  '18px': '18px',
  '19px': '19px',
  '20px': '20px'
};

const rem = {
  '1': '0.8rem',
  '2': '1.6rem',
  '3': '2.4rem',
  '4': '3.2rem',
  '5': '4rem',
  '6': '4.8rem',
  '7': '5.6rem',
  '8': '6.4rem',
  '9': '7.2rem',
  '10': '8rem',
  '11': '8.8rem',
  '12': '9.6rem',
  '13': '10.4rem',
  '14': '11.2rem',
  '15': '12rem',
  '16': '12.8rem',
  '17': '13.6rem',
  '18': '14.4rem',
  '19': '15.2rem',
  '20': '16rem',
};

module.exports = {
	prefix: '',
	important: false,
  mode: 'jit',
	purge: [
		'./src/**/*.html',
		'./src/**/*.json',
		'./src/**/*.js',
		'./src/**/*.css'
	],
	separator: ':',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		},
		colors: {
			transparent: 'transparent',

			black: '#000',
			white: '#fff',

			gray: {
				100: '#f7fafc',
				200: '#edf2f7',
				300: '#e2e8f0',
				400: '#cbd5e0',
				500: '#a0aec0',
				600: '#718096',
				700: '#4a5568',
				800: '#2d3748',
				900: '#1a202c'
			},
			red: {
				100: '#fff5f5',
				200: '#fed7d7',
				300: '#feb2b2',
				400: '#fc8181',
				500: '#f56565',
				600: '#e53e3e',
				700: '#c53030',
				800: '#9b2c2c',
				900: '#742a2a'
			},
			orange: {
				100: '#fffaf0',
				200: '#feebc8',
				300: '#fbd38d',
				400: '#f6ad55',
				500: '#ed8936',
				600: '#dd6b20',
				700: '#c05621',
				800: '#9c4221',
				900: '#7b341e'
			},
			yellow: {
				100: '#fffff0',
				200: '#fefcbf',
				300: '#faf089',
				400: '#f6e05e',
				500: '#ecc94b',
				600: '#d69e2e',
				700: '#b7791f',
				800: '#975a16',
				900: '#744210'
			},
			green: {
				100: '#f0fff4',
				200: '#c6f6d5',
				300: '#9ae6b4',
				400: '#68d391',
				500: '#48bb78',
				600: '#38a169',
				700: '#2f855a',
				800: '#276749',
				900: '#22543d'
			},
			teal: {
				100: '#e6fffa',
				200: '#b2f5ea',
				300: '#81e6d9',
				400: '#4fd1c5',
				500: '#38b2ac',
				600: '#319795',
				700: '#2c7a7b',
				800: '#285e61',
				900: '#234e52'
			},
			blue: {
				100: '#ebf8ff',
				200: '#bee3f8',
				300: '#90cdf4',
				400: '#63b3ed',
				500: '#4299e1',
				600: '#3182ce',
				700: '#2b6cb0',
				800: '#2c5282',
				900: '#2a4365'
			},
			indigo: {
				100: '#ebf4ff',
				200: '#c3dafe',
				300: '#a3bffa',
				400: '#7f9cf5',
				500: '#667eea',
				600: '#5a67d8',
				700: '#4c51bf',
				800: '#434190',
				900: '#3c366b'
			},
			purple: {
				100: '#faf5ff',
				200: '#e9d8fd',
				300: '#d6bcfa',
				400: '#b794f4',
				500: '#9f7aea',
				600: '#805ad5',
				700: '#6b46c1',
				800: '#553c9a',
				900: '#44337a'
			},
			pink: {
				100: '#fff5f7',
				200: '#fed7e2',
				300: '#fbb6ce',
				400: '#f687b3',
				500: '#ed64a6',
				600: '#d53f8c',
				700: '#b83280',
				800: '#97266d',
				900: '#702459'
			}
		},
		spacing: {
			'0': '0',
      ...px,
      ...rem
		},
		backgroundColor: theme => theme('colors'),
		backgroundPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top'
		},
		backgroundSize: {
			auto: 'auto',
			cover: 'cover',
			contain: 'contain'
		},
		borderColor: theme => ({
			...theme('colors'),
			default: theme('colors.gray.300', 'currentColor')
		}),
		borderRadius: {
			none: '0',
			sm: '0.125rem',
			default: '0.25rem',
			lg: '0.5rem',
			full: '9999px'
		},
		borderWidth: {
			default: '1px',
			'0': '0',
			'2': '2px',
			'4': '4px',
			'8': '8px'
		},
		boxShadow: {
			default:
				'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
			md:
				'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			lg:
				'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			xl:
				'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
			none: 'none'
		},
		container: {},
		cursor: {
			auto: 'auto',
			default: 'default',
			pointer: 'pointer',
			wait: 'wait',
			text: 'text',
			move: 'move',
			'not-allowed': 'not-allowed'
		},
		fill: {
			current: 'currentColor'
		},
		flex: {
			'1': '1 1 0%',
			auto: '1 1 auto',
			initial: '0 1 auto',
			none: 'none'
		},
		flexGrow: {
			'0': '0',
			default: '1'
		},
		flexShrink: {
			'0': '0',
			default: '1'
		},
		fontFamily: {
			sans: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"'
			],
			serif: [
        'Georgia', 
        'Cambria', 
        '"Times New Roman"', 
        'Times', 
        'serif'
      ],
			mono: [
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace'
			]
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'1x': '1em',
			'2x': '2em',
			'3x': '3em',
			'4x': '4em',
			'5x': '5em',
      '6x': '6em',
			'7x': '7em',
			'8x': '8em',
			'9x': '9em',
			'10x': '10em'
		},
		fontWeight: {
			'100': '100',
			'200': '200',
			'300': '300',
			'400': '400',
			'500': '500',
			'600': '600',
			'700': '700',
			'800': '800',
			'900': '900'
		},
		height: theme => ({
			auto: 'auto',
			...theme('spacing'),
			full: '100%',
			screen: '100vh'
		}),
		inset: {
			'0': '0',
			auto: 'auto'
		},
		letterSpacing: {
			tighter: '-0.05em',
			tight: '-0.025em',
			normal: '0',
			wide: '0.025em',
			wider: '0.05em',
			widest: '0.1em'
		},
		lineHeight: {
			none: '1',
			tight: '1.25',
			snug: '1.375',
			normal: '1.5',
			relaxed: '1.625',
			loose: '2'
		},
		listStyleType: {
			none: 'none',
			disc: 'disc',
			decimal: 'decimal'
		},
		margin: (theme, { negative }) => ({
			auto: 'auto',
			...theme('spacing'),
			...negative(theme('spacing'))
		}),
		maxHeight: {
			full: '100%',
			screen: '100vh'
		},
		maxWidth: {
			xs: '20rem',
			sm: '24rem',
			md: '28rem',
			lg: '32rem',
			xl: '36rem',
			'2xl': '42rem',
			'3xl': '48rem',
			'4xl': '56rem',
			'5xl': '64rem',
			'6xl': '72rem',
			full: '100%'
		},
		minHeight: {
			'0': '0',
			full: '100%',
			screen: '100vh'
		},
		minWidth: {
			'0': '0',
			full: '100%'
		},
		objectPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top'
		},
		opacity: {
			'0': '0',
			'25': '0.25',
			'50': '0.5',
			'75': '0.75',
			'100': '1'
		},
		order: {
			first: '-9999',
			last: '9999',
			none: '0',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12'
		},
		padding: theme => theme('spacing'),
		placeholderColor: theme => theme('colors'),
		stroke: {
			current: 'currentColor'
		},
		textColor: theme => theme('colors'),
		width: theme => ({
			auto: 'auto',
			...theme('spacing'),
			'1/2': '50%',
			'1/3': '33.333333%',
			'2/3': '66.666667%',
			'1/4': '25%',
			'2/4': '50%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/5': '60%',
			'4/5': '80%',
			'1/6': '16.666667%',
			'2/6': '33.333333%',
			'3/6': '50%',
			'4/6': '66.666667%',
			'5/6': '83.333333%',
			'1/12': '8.333333%',
			'2/12': '16.666667%',
			'3/12': '25%',
			'4/12': '33.333333%',
			'5/12': '41.666667%',
			'6/12': '50%',
			'7/12': '58.333333%',
			'8/12': '66.666667%',
			'9/12': '75%',
			'10/12': '83.333333%',
			'11/12': '91.666667%',
			full: '100%',
			screen: '100vw'
		}),
		zIndex: {
			auto: 'auto',
			'0': '0',
      '1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'20': '20',
			'30': '30',
			'40': '40',
			'50': '50'
		}
	},
	variants: {
    accessibility: ['responsive', 'focus-within', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    animation: ['responsive'],
    appearance: ['responsive'],
    backdropBlur: ['responsive'],
    backdropBrightness: ['responsive'],
    backdropContrast: ['responsive'],
    backdropFilter: ['responsive'],
    backdropGrayscale: ['responsive'],
    backdropHueRotate: ['responsive'],
    backdropInvert: ['responsive'],
    backdropOpacity: ['responsive'],
    backdropSaturate: ['responsive'],
    backdropSepia: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundBlendMode: ['responsive'],
    backgroundClip: ['responsive'],
    backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    backgroundImage: ['responsive'],
    backgroundOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    backgroundOrigin: ['responsive'],
    blur: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    borderOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    boxDecorationBreak: ['responsive'],
    boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    boxSizing: ['responsive'],
    brightness: ['responsive'],
    clear: ['responsive'],
    container: ['responsive'],
    contrast: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    divideColor: ['responsive', 'dark'],
    divideOpacity: ['responsive', 'dark'],
    divideStyle: ['responsive'],
    divideWidth: ['responsive'],
    dropShadow: ['responsive'],
    fill: ['responsive'],
    filter: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontStyle: ['responsive'],
    fontVariantNumeric: ['responsive'],
    fontWeight: ['responsive'],
    gap: ['responsive'],
    gradientColorStops: ['responsive', 'dark', 'hover', 'focus'],
    grayscale: ['responsive'],
    gridAutoColumns: ['responsive'],
    gridAutoFlow: ['responsive'],
    gridAutoRows: ['responsive'],
    gridColumn: ['responsive'],
    gridColumnEnd: ['responsive'],
    gridColumnStart: ['responsive'],
    gridRow: ['responsive'],
    gridRowEnd: ['responsive'],
    gridRowStart: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: ['responsive'],
    height: ['responsive'],
    hueRotate: ['responsive'],
    inset: ['responsive'],
    invert: ['responsive'],
    isolation: ['responsive'],
    justifyContent: ['responsive'],
    justifyItems: ['responsive'],
    justifySelf: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    mixBlendMode: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    order: ['responsive'],
    outline: ['responsive', 'focus-within', 'focus'],
    overflow: ['responsive'],
    overscrollBehavior: ['responsive'],
    padding: ['responsive'],
    placeContent: ['responsive'],
    placeItems: ['responsive'],
    placeSelf: ['responsive'],
    placeholderColor: ['responsive', 'dark', 'focus'],
    placeholderOpacity: ['responsive', 'dark', 'focus'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    ringColor: ['responsive', 'dark', 'focus-within', 'focus'],
    ringOffsetColor: ['responsive', 'dark', 'focus-within', 'focus'],
    ringOffsetWidth: ['responsive', 'focus-within', 'focus'],
    ringOpacity: ['responsive', 'dark', 'focus-within', 'focus'],
    ringWidth: ['responsive', 'focus-within', 'focus'],
    rotate: ['responsive', 'hover', 'focus'],
    saturate: ['responsive'],
    scale: ['responsive', 'hover', 'focus'],
    sepia: ['responsive'],
    skew: ['responsive', 'hover', 'focus'],
    space: ['responsive'],
    stroke: ['responsive'],
    strokeWidth: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    textDecoration: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOverflow: ['responsive'],
    textTransform: ['responsive'],
    transform: ['responsive'],
    transformOrigin: ['responsive'],
    transitionDelay: ['responsive'],
    transitionDuration: ['responsive'],
    transitionProperty: ['responsive'],
    transitionTimingFunction: ['responsive'],
    translate: ['responsive', 'hover', 'focus'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive', 'focus-within', 'focus']
	},
	corePlugins: {},
	plugins: [
    plugin(function ({ addVariant, e }) {
			addVariant('not-loaded', ({ modifySelectors, separator }) => {
			  modifySelectors(({ className }) => { return `.${e(`not-loaded${separator}${className}`)}[data-loaded='false']`}) })
		}),
    
		plugin(function ({ addVariant, e }) {
			addVariant('loaded', ({ modifySelectors, separator }) => {
			  modifySelectors(({ className }) => { return `.${e(`loaded${separator}${className}`)}[data-loaded='true']`}) })
		}),

		plugin(function ({ addVariant, e }) {
			addVariant('group-not-loaded', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.group[data-loaded='false'] .${e(`group-not-loaded${separator}${className}`)}`
				})
			})
		}),

		plugin(function ({ addVariant, e }) {
			addVariant('group-loaded', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.group[data-loaded='true'] .${e(`group-loaded${separator}${className}`)}`
				})
			})
		}),

    plugin(function ({ addVariant, e }) {
			addVariant('not-expanded', ({ modifySelectors, separator }) => {
			  modifySelectors(({ className }) => { return `.${e(`not-expanded${separator}${className}`)}[aria-expanded='false']`}) })
		}),

		plugin(function ({ addVariant, e }) {
			addVariant('expanded', ({ modifySelectors, separator }) => {
			  modifySelectors(({ className }) => { return `.${e(`expanded${separator}${className}`)}[aria-expanded='true']`}) })
		}),

		plugin(function ({ addVariant, e }) {
			addVariant('group-not-expanded', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.group[aria-expanded='false'] .${e(`group-not-expanded${separator}${className}`)}`
				})
			})
		}),

		plugin(function ({ addVariant, e }) {
			addVariant('group-expanded', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.group[aria-expanded='true'] .${e(`group-expanded${separator}${className}`)}`
				})
			})
		}),
  ]
};
