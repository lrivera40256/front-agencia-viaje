import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialButton } from "./SocialButton";
import { Mail, Lock, Eye, EyeOff, MapPin, Plane } from "lucide-react";
import travelHeroBg from "@/assets/travel-hero-bg.jpg";

interface LoginFormProps {
  onEmailLogin: (email: string, password: string) => void;
  onSocialLogin: (provider: 'google' | 'microsoft' | 'github') => void;
}

export function LoginForm({ onEmailLogin, onSocialLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ email: "", password: "" });
    
    // Validation
    let hasErrors = false;
    const newErrors = { email: "", password: "" };
    
    if (!email) {
      newErrors.email = "El email es requerido";
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Ingresa un email válido";
      hasErrors = true;
    }
    
    if (!password) {
      newErrors.password = "La contraseña es requerida";
      hasErrors = true;
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onEmailLogin(email, password);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 travel-hero-bg"
        style={{ backgroundImage: `url(${travelHeroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 travel-overlay" />
      
      {/* Floating Travel Elements */}
      <div className="absolute top-20 left-20 text-travel-sand/20 floating-element">
        <Plane className="w-12 h-12 transform rotate-45" />
      </div>
      <div className="absolute top-32 right-32 text-travel-sand/15 floating-element">
        <MapPin className="w-8 h-8" />
      </div>
      <div className="absolute bottom-40 left-16 text-travel-sand/25 floating-element">
        <Plane className="w-6 h-6 transform -rotate-12" />
      </div>
      
      <Card className="w-full max-w-md auth-card-blur auth-glow animate-fade-in relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-20 h-20 travel-gradient rounded-full flex items-center justify-center mb-6 animate-pulse-glow relative overflow-hidden">
            <div className="absolute inset-0 travel-shimmer opacity-30"></div>
            <Plane className="w-10 h-10 text-white animate-travel-bounce" />
          </div>
          <CardTitle className="text-2xl font-bold text-travel-navy">
            Explora el Mundo
          </CardTitle>
          <p className="text-muted-foreground">Inicia tu próxima aventura</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4 text-travel-ocean" />
            <span>Más de 150 destinos esperándote</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <SocialButton
              provider="google"
              onClick={() => onSocialLogin('google')}
              className="w-full"
            />
            <SocialButton
              provider="microsoft"
              onClick={() => onSocialLogin('microsoft')}
              className="w-full"
            />
            <SocialButton
              provider="github"
              onClick={() => onSocialLogin('github')}
              className="w-full"
            />
          </div>
          
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-travel-ocean/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-auth-card px-4 py-1 text-muted-foreground rounded-full border border-travel-ocean/20">
                  O continúa con email
                </span>
              </div>
            </div>
          
          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 bg-auth-input border-auth-input-border focus:border-primary transition-colors ${
                    errors.email ? 'border-destructive' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 bg-auth-input border-auth-input-border focus:border-primary transition-colors ${
                    errors.password ? 'border-destructive' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full travel-gradient hover:opacity-90 transition-all duration-300 font-semibold h-12 relative overflow-hidden group"
              disabled={isLoading}
            >
              <div className="absolute inset-0 travel-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                    <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                    <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span>Comenzar Aventura</span>
                </div>
              )}
            </Button>
          </form>
          
          <div className="text-center">
            <button className="text-sm text-travel-ocean hover:text-travel-navy transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>🌍 Descubre lugares increíbles • ✈️ Viaja con confianza</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}