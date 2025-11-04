import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MapPin, Eye, EyeOff } from "lucide-react";
import travelHeroBg from "@/assets/travel-hero-bg.jpg";
import { Link } from "react-router-dom";

export function RegisterForm() {
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    register({ name, email, password });
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
            <Plane className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl text-gray-800 mb-1">Crea tu Cuenta</CardTitle>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            Descubre destinos increíbles
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-4">
         
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-sm">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 text-sm"
                required
              />
            </div>

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

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Inicia sesión
                </Link>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 mt-3"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Registrarme"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
