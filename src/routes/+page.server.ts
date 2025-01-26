import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) redirect(302, '/login');
};
