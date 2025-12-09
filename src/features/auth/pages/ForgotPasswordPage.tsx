import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, Lock } from "lucide-react";
import travelHeroBg from "@/assets/travel-hero-bg.jpg";
import { requestPasswordReset, resetPassword } from "../services/authService";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isResetMode = Boolean(token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isResetMode && password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      if (isResetMode && token) {
        await resetPassword(token, password);
        toast.success("Contraseña restablecida. Inicia sesión nuevamente");
        navigate("/login", { replace: true });
      } else {
        await requestPasswordReset(email);
        toast.success("Si tu correo está registrado, enviamos un enlace de recuperación");
      }
    } catch (err: any) {
      toast.error(err?.message || "No se pudo completar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 py-2 relative overflow-hidden travel-gradient">
      <div
        className="absolute inset-0 travel-hero-bg"
        style={{ backgroundImage: `url(${travelHeroBg})` }}
      />
      <div className="absolute inset-0 travel-overlay" />

      <Card className="w-full max-w-sm auth-card-blur auth-glow animate-fade-in relative z-10 max-h-[90vh] overflow-hidden overflow-y-auto">
        <CardHeader className="text-center pb-3">
          <div className="mx-auto mb-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            {isResetMode ? <Lock className="w-5 h-5 text-white" /> : <Plane className="w-5 h-5 text-white" />}
          </div>
          <CardTitle className="text-xl text-gray-800 mb-1">
            {isResetMode ? "Restablece tu contraseña" : "Recupera tu contraseña"}
          </CardTitle>
          <p className="text-xs text-gray-500">
            {isResetMode
              ? "Elige una nueva contraseña para tu cuenta"
              : "Ingresa tu correo y te enviaremos un enlace de recuperación"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isResetMode && (
              <div>
                <Label htmlFor="email" className="text-sm">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 text-sm"
                  required
                />
              </div>
            )}

            {isResetMode && (
              <>
                <div>
                  <Label htmlFor="password" className="text-sm">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm">
                    Confirmar contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-2 text-sm"
                    required
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading
                ? "Enviando..."
                : isResetMode
                ? "Actualizar contraseña"
                : "Enviar enlace"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline font-medium">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
