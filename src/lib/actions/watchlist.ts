import { postWatchlist } from '$lib/server/watchlist';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

export const watchlist = async ({ cookies, request }: RequestEvent) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) redirect(302, '/login');

	const formData = await request.formData();
	const name = formData.get('watchlist');

	if (!name) return fail(400, { error: 'Invalid information', name: '' });
	if (typeof name !== 'string') return fail(400, { error: 'Invalid information', name: '' });

	try {
		await postWatchlist(existingToken, { name, 'watchlist-entries': [] });
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, name });
		return fail(400, { error: 'Something went wrong', name });
	}

	return { success: true };
};
