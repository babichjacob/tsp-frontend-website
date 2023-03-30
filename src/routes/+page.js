import { redirect } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export const load = () => {
	throw redirect(307, '/lighting');
};
