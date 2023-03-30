const { prefersDark } = require('tailwindcss-theme-variants');
const { prefersLight } = require('tailwindcss-theme-variants');

module.exports = {
	light_dark: {
		baseSelector: '[data-theme]',
		themes: {
			light: {
				mediaQuery: prefersLight,
				semantics: {
					colors: {
						primary: 'white',
                        'on-primary': 'neutral.800',
                        
                        'on-primary-dim': 'neutral.700',
                        'on-primary-dimmer': 'neutral.600',
                        'on-primary-dimmer-more': 'neutral.500',
					}
				}
			},
			dark: {
				mediaQuery: prefersDark,
				semantics: {
					colors: {
						primary: 'neutral.800',
                        'on-primary': 'neutral.100',
                        
						'on-primary-dim': 'neutral.200',
						'on-primary-dimmer': 'neutral.300',
						'on-primary-dimmer-more': 'neutral.400',
					}
				}
			}
		}
	}
};
