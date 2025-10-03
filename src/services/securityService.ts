import api from '../interceptors/axiosInterceptor';
import axios from 'axios';

export type LoginResponse = {
    fa_required: boolean;
    message?: string;
    sessionId?: string;
};

export type Validate2FAResponse = {
    valid: boolean;
    token: string;
};

const toFriendlyError = (err: unknown): Error => {
  if (axios.isAxiosError(err)) {
    const res = err.response;
    const data = res?.data as any;
    const headers = (res?.headers ?? {}) as Record<string, string>;
    const headerMsg = headers['x-error-message'] || headers['x-message'];
    const responseText =
      typeof (err.request as any)?.responseText === 'string'
        ? (err.request as any).responseText
        : '';

    const msg =
      (typeof data === 'string' && data.trim() ? data : undefined) ||
      data?.message ||
      data?.error ||
      headerMsg ||
      (responseText && !/^<[^>]+>/.test(responseText) ? responseText : '') || // evita HTML de error por defecto
      res?.statusText ||
      err.message ||
      'Error de autenticación';

    return new Error(msg);
  }
  return new Error((err as any)?.message || 'Error de autenticación');
};

export async function login(user?: { email: string; password: string }, idToken?: string) {
    try {
      const body = {};
      if (user) body["user"] = user;
      if (idToken) body["token"] = idToken;
      const { data } = await api.post('/public/security/login', body);
      
      return data;
    } catch (err) {
        throw toFriendlyError(err);
    }
}

export async function validate2FA(sessionId: string, code: string): Promise<Validate2FAResponse> {
  try {
    const { data } = await api.post('/public/security/validate-2fa', { sessionId, code });
    return data;
  } catch (err) {
    throw toFriendlyError(err);
  }
}


export async function loginOAuth(idToken: string) {
	const { data } = await api.post('/public/security/oauth-login', { idToken });
	return data;
}	

