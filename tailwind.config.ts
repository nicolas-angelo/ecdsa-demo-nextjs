import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const gray = colors.neutral;

export default {
	darkMode: 'class',
	important: true,
	content: ['./src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			colors: {
							ethereum: "#716b94",
				carbon: {
					...gray,
					700: colors.zinc[700],
					750: '#2f2f36',
				},
			},
			backgroundImage: {
				'gradient-0': 'linear-gradient(0deg, var(--tw-gradient-stops))',
			},
			transitionProperty: {
				width: 'width',
				height: 'height',
				spacing: 'margin, padding',
			},
		},
	},
	plugins: [
		require('@headlessui/tailwindcss'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/container-queries'),
	],
} satisfies Config;
