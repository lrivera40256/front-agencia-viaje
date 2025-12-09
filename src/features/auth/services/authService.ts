import api from "@/interceptors/axiosInterceptor";

interface LoginOptions {
  user?: { email: string; password: string };
  idToken?: string;
  captcha?: string;
}

export async function login(options: LoginOptions) {
  try {
    const body: Record<string, any> = {};
    if (options.user) body["user"] = options.user;
    if (options.idToken) body["token"] = options.idToken;
    if (options.captcha) body.captcha = options.captcha;
    console.log(body);
    const { data } = await api.post('/public/security/login', body);
    return data;
  } catch (err) {
    throw new Error('Error during login');
  }
}

export async function verifyTwoFactor(sessionId: string, code: string): Promise<any> {
  const { data } = await api.post('/public/security/validate-2fa', { sessionId, code });
  return data;
}

export async function registerUser(data: any) {
  const res = await api.post(`/public/security/register`, data);
  return res.data;
}

export async function requestPasswordReset(email: string) {
  try {
    const { data } = await api.post('/public/security/forgot-password', { email });
    console.log(data);
    
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || 'No se pudo enviar el enlace de recuperación');
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const { data } = await api.post('/public/security/reset-password', { token, newPassword });
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || 'No se pudo restablecer la contraseña');
  }
}


