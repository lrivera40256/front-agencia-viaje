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


