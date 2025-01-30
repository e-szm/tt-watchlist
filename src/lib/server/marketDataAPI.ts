import { TT_BASE_URL } from '$env/static/private';

interface MarketData {
	symbol: string;
	ask: string;
	bid: string;
	last: string;
}

export async function getMarketData(token: string, symbol: string): Promise<MarketData> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/market-data/${encodeURIComponent(symbol)}`, {
		headers,
		method: 'GET'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}
