import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { SocialButton } from "./SocialButton";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MapPin, Eye, EyeOff } from "lucide-react";
import travelHeroBg from "@/assets/travel-hero-bg.jpg";
import { Link } from "react-router-dom";
import { GitHubButton, GoogleButton } from "@/features/auth";
import { MicrosoftButton } from "@/features/auth";

export function LoginForm() {
  const { login, verifyCode, requires2FA, loading, captcha } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  if (requires2FA) {
    return <TwoFactorAuth email={email} onBack={() => window.location.reload()} onVerify={verifyCode} />
  }
    
  return (
    <>
        <div className="w-screen h-screen flex items-center justify-center px-4 py-2 relative overflow-hidden travel-gradient">
          <div
            className="absolute inset-0 travel-hero-bg"
            style={{ backgroundImage: `url(${travelHeroBg})` }}
          />
          <div className="absolute inset-0 travel-overlay" />

          <Card className="w-full max-w-sm auth-card-blur auth-glow animate-fade-in relative z-10 max-h-[90vh] overflow-hidden overflow-y-auto">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800 mb-1">Explora el Mundo</CardTitle>
              <div className="flex items-center justify-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                Más de 150 destinos esperándote
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-4">
              <div className="space-y-2">
                <GitHubButton />
                <MicrosoftButton />
                <GoogleButton />
              </div>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">O CONTINÚA CON EMAIL</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login(email, password);
                }}
                className="space-y-3"
              >
                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email
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

                <div className="relative">
                  <Label htmlFor="password" className="text-sm">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                    Olvidé mi contraseña
                  </Link>
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA ref={captcha} sitekey={import.meta.env.VITE_CAPTCHA} />
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    ¿Aun no tienes cuenta?{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Crea una cuenta
                    </Link>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 mt-3"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Comenzar Aventura"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
    </>
  );
}
