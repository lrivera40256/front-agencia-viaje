import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login as loginUser, verifyTwoFactor, registerUser } from "../services/authService";
import { useAuthContext } from "../contexts/AuthProvider";
import ReCAPTCHA from "react-google-recaptcha";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [email, setEmail] = useState("");
  const captcha = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const { setAuthData } = useAuthContext();

  const login = async (emailValue: string, password: string) => {
    setLoading(true);
    try {
      const token = captcha.current?.getValue();
      if (!token) {
        toast.error("Completa el captcha");
        return;
      }

      const res = await loginUser({user:{ email: emailValue, password },captcha:token});

      if (res["2fa_required"]) {
        setSessionId(res.sessionId);
        setRequires2FA(true);
        setEmail(emailValue);
        return;
      }

      if (res.token) {
        setAuthData(res.user, res.token);
        toast.success("Inicio de sesión exitoso ✈️");
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (code: string) => {
    setLoading(true);
    try {
      const res = await verifyTwoFactor(sessionId, code);
      if (!res.valid || !res.token) throw new Error("Código inválido o expirado");
      setAuthData(res.user, res.token);
      toast.success("Verificación exitosa ✅");
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err?.message || "Error al verificar código");
      setRequires2FA(false);
      setSessionId("");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      await registerUser(data);
      toast.success("Cuenta creada correctamente 🎉");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return { email, loading, captcha, requires2FA, login, verifyCode, register };
}
