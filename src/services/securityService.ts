import api from '../interceptors/axiosInterceptor';

export type LoginResponse = {
	'2fa_required': boolean;
	message?: string;
	sessionId?: string;
};

export type Validate2FAResponse = {
	valid: boolean;
	token: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
	const { data } = await api.post('/public/security/login', { email, password });
	return data;
}

export async function validate2FA(sessionId: string, code: string): Promise<Validate2FAResponse> {
	const { data } = await api.post('/public/security/validate-2fa', { sessionId, code });
	return data;
}

export function saveToken(token: string) {
	localStorage.setItem('accessToken', token);
	(api.defaults.headers as any).common = {
		...(api.defaults.headers as any).common,
		Authorization: `Bearer ${token}`,
	};
}
export async function loginOAuth(idToken: string) {
	const { data } = await api.post('/public/security/oauth-login', { idToken });
	return data;
}	

