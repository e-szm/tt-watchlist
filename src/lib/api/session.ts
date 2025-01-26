interface PostSession {
	login: string;
	password: string;
	'remember-me'?: string;
	'remember-token'?: string;
}

interface SessionResponse {
	user: {
		email: string;
		'external-id': string;
		'is-confirmed': string;
		name: string;
		nickname: string;
		username: string;
	};
	'remember-token': string;
	'session-expiration': string;
	'session-token': string;
}

export async function postSession(body: PostSession): Promise<SessionResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const res = await fetch('https://api.cert.tastyworks.com/sessions', {
		headers,
		method: 'POST',
		body: JSON.stringify(body)
	});
	if (!res.ok || res.status !== 201) throw new Error('Invalid username or password');

	return (await res.json()).data;
}
