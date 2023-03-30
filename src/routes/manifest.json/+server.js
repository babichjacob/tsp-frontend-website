import { json } from '@sveltejs/kit';

import colors from 'tailwindcss/colors.js';

import icon192 from '../favicon.png?width=192&height=192&format=png';
import icon512 from '../favicon.png?width=512&height=512&format=png';

export const prerender = true;

/** @type {import("@sveltejs/kit").RequestHandler} */
export const GET = (event) => {
	const manifest = {
		short_name: 'Smart Home',
		name: 'Smart Home System',
		description: 'A smart home system with a focus on lighting',
		lang: 'en',
		icons: [
			{
				src: icon192,
				type: 'image/png',
				sizes: '192x192',
				purpose: 'any maskable'
			},
			{
				src: icon512,
				type: 'image/png',
				sizes: '512x512',
				purpose: 'any maskable'
			}
		],
		start_url: '/',
		display: 'minimal-ui',
		background_color: colors.white,
		theme_color: colors.blue[500],
		shortcuts: [
			{
				name: 'Lighting',
				short_name: 'Light',
				description: "See and control your home's lighting",
				url: '/lighting',
				icons: [] // TODO,
			},
			{
				name: 'Home security',
				short_name: 'Security',
				description: `View intruder alerts`,
				url: '/security',
				icons: [] // TODO,
			},
			{
				name: 'Recorded videos',
				short_name: 'Recordings',
				description: `See all the videos people in your home have recorded`,
				url: '/recordings',
				icons: [] // TODO,
			}
		]
	};

	return json(manifest);
};
