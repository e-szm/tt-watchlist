import { TT_BASE_URL } from '$env/static/private';

interface AllWatchlistResponse {
	items: {
		name: string;
		'order-index': number;
		'watchlist-entries'?: { symbol: string }[];
		'cms-id'?: string;
		'group-name'?: string;
	}[];
}

interface OneWatchlistResponse {
	name: string;
	'order-index': number;
	'watchlist-entries'?: { symbol: string }[];
	'cms-id'?: string;
	'group-name'?: string;
}

interface PostWatchlist {
	name: string;
	'watchlist-entries': { symbol: string }[];
}

export async function getAllWatchlists(token: string): Promise<AllWatchlistResponse> {
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

export async function getOneWatchlist(
	token: string,
	watchlist: string
): Promise<OneWatchlistResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists/${watchlist}`, {
		headers,
		method: 'GET'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function postWatchlist(
	token: string,
	body: PostWatchlist
): Promise<OneWatchlistResponse> {
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

export async function putWatchlist(
	token: string,
	watchlist: string,
	body: PostWatchlist
): Promise<OneWatchlistResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists/${watchlist}`, {
		headers,
		method: 'PUT',
		body: JSON.stringify(body)
	});

	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function deleteOneWatchlist(
	token: string,
	watchlist: string
): Promise<OneWatchlistResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists/${watchlist}`, {
		headers,
		method: 'DELETE'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function getMarketData(token: string, symbol: string): Promise<unknown> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/market-data/${symbol}`, {
		headers,
		method: 'GET'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}
