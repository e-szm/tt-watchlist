import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMarketData } from '$lib/server/watchlist';

export const GET: RequestHandler = async ({ cookies, params }) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) redirect(302, '/login');

	const symbol = params.slug;
	if (!symbol) return error(400, 'Invalid information');
	if (typeof symbol !== 'string') return error(400, 'Invalid information');

	const data = await getMarketData(existingToken, symbol);

	return json(data);
};
