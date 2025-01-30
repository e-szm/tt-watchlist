import Constants from '$lib/classes/Constants';

interface PostSessionRequest {
	login: string;
	password: string;
	'remember-me'?: string;
	'remember-token'?: string;
}

interface PostSessionResponse {
	user: {
		email: string;
		'external-id': string;
		'is-confirmed': string;
		name: string;
		nickname: string;
		username: string;
	};
	'remember-token'?: string;
	'session-expiration': string;
	'session-token': string;
}

export async function postSession(body: PostSessionRequest): Promise<PostSessionResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const res = await fetch(`${Constants.TT_BASE_URL}/sessions`, {
		headers,
		method: 'POST',
		body: JSON.stringify(body)
	});
	if (!res.ok || res.status !== 201) throw new Error('Invalid username or password');

	return (await res.json()).data;
}
