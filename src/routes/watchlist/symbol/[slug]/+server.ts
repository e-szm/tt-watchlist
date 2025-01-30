import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMarketData } from '$lib/server/marketDataAPI';

export const GET: RequestHandler = async ({ locals, params }) => {
	const symbol = params.slug;
	if (!symbol) return error(400, 'Invalid information');
	if (typeof symbol !== 'string') return error(400, 'Invalid information');

	try {
		const data = await getMarketData(locals.user.token, symbol);
		return json(data);
	} catch (err: unknown) {
		if (err instanceof Error) return error(400, err.message);
		return error(400, 'Something went wrong');
	}
};
