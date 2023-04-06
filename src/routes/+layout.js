import { PUBLIC_PROXY_ENDPOINT } from '$env/static/public';
import { createWebSocketStuff } from '$lib/websocket';

import '@fontsource/inter/variable.css';
import '../app.postcss';

export const ssr = false;
export const prerender = false;
export const csr = true;

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	const { allEvents, connection, messages, websocket } =
		createWebSocketStuff(PUBLIC_PROXY_ENDPOINT);

	return {
		allEvents,
		connection,
		messages,
		websocket,
		canOpenNav: true
	};
}
