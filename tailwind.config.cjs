const defaultConfig = require('tailwindcss/defaultConfig');

const { themeVariants } = require('tailwindcss-theme-variants');
const { light_dark } = require('./theme-styles.cjs');

const defaultTheme = defaultConfig.theme;

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [themeVariants(light_dark)]
};
