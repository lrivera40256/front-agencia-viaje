import api from '../interceptors/axiosInterceptor';
import axios from 'axios';
export interface PermissionDto {
  url: string;
  method: string;
  [k: string]: any;
}
export interface LoginResponse {
  '2fa_required': boolean;
  sessionId?: string;
  token?: string;
  permissions?: PermissionDto[];
  user?: { _id: string; name: string; email: string; isOauth?: boolean };
  profileId?: string;
  message?: string;
  status?: number;
}

export interface Validate2FAResponse {
  valid: boolean;
  token: string;
  permissions?: PermissionDto[];
  profileId?: string;
}

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
      (responseText && !/^<[^>]+>/.test(responseText) ? responseText : '') ||
      res?.statusText ||
      err.message ||
      'Error de autenticación';

    return new Error(msg);
  }
  return new Error((err as any)?.message || 'Error de autenticación');
};

export async function login(user?: { email: string; password: string }, idToken?: string, captcha?: string) {
  try {
    const body: Record<string, any> = {};
    if (user) body["user"] = user;
    if (idToken) body["token"] = idToken;
    if (captcha) body.captcha = captcha;
    console.log(body);
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
