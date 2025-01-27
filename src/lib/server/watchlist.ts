import { TT_BASE_URL } from '$env/static/private';

interface WatchlistResponse {
	items: {
		name: string;
		'order-index': number;
		'watchlist-entries'?: { symbol: string }[];
		'cms-id'?: string;
		'group-name'?: string;
	}[];
}

interface PostWatchlist {
	name: string;
	'watchlist-entries': { symbol: string }[];
}

export async function getWatchlist(token: string): Promise<WatchlistResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists`, {
		headers,
		method: 'GET'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function postWatchlist(
	token: string,
	body: PostWatchlist
): Promise<WatchlistResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists`, {
		headers,
		method: 'POST',
		body: JSON.stringify(body)
	});
	if (!res.ok || res.status !== 201) throw new Error('Something went wrong');

	return (await res.json()).data;
}
