const { prefersDark, prefersLight } = require('tailwindcss-theme-variants');
const {
	colorToRgb,
	rgbToThemeValue
} = require('tailwindcss-theme-variants/theme-and-variable-converters');

module.exports = {
	light_dark: {
		baseSelector: '[data-theme]',
		themes: {
			light: {
				mediaQuery: prefersLight,
				semantics: {
					colors: {
						primary: 'white',
						'on-primary': 'slate.800',

						'on-primary-dim': 'slate.700',
						'on-primary-dimmer': 'slate.600',
						'on-primary-dimmer-more': 'slate.500',

						'action-brighter': 'cyan.400',
						action: 'cyan.500',
						'on-action': 'white',
						'on-action-dimmer': 'cyan.100'
					}
				}
			},
			dark: {
				mediaQuery: prefersDark,
				semantics: {
					colors: {
						primary: 'slate.950',
						'on-primary': 'slate.100',

						'on-primary-dim': 'slate.200',
						'on-primary-dimmer': 'slate.300',
						'on-primary-dimmer-more': 'slate.400',

						'action-brighter': 'cyan.500',
						action: 'cyan.600',
						'on-action': 'white',
						'on-action-dimmer': 'cyan.100'
					}
				}
			}
		},
		utilities: {
			colors: {
				themeValueToVariableValue: colorToRgb,
				variableValueToThemeValue: rgbToThemeValue
			}
		}
	}
};
