import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { TwoFactorAuth } from "@/components/auth/TwoFactorAuth";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plane } from "lucide-react";

type AuthStep = 'login' | '2fa' | 'success';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  const handleEmailLogin = (email: string, password: string) => {
    setUserEmail(email);
    setCurrentStep('2fa');
    toast({
      title: "Código enviado",
      description: `Hemos enviado un código de verificación a ${email}`,
    });
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'github') => {
    // Simulate successful social login
    toast({
      title: "¡Login exitoso!",
      description: `Iniciaste sesión con ${provider}`,
    });
    
    setTimeout(() => {
      setCurrentStep('success');
    }, 1000);
  };

  const handleTwoFactorVerify = (code: string) => {
    toast({
      title: "¡Verificación exitosa!",
      description: "Redirigiendo al dashboard...",
    });
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setUserEmail("");
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 travel-hero-bg"
          style={{ backgroundImage: `url(/src/assets/travel-hero-bg.jpg)` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 travel-overlay" />
        
        <div className="text-center animate-fade-in z-10 relative">
          <div className="mx-auto w-24 h-24 travel-gradient rounded-full flex items-center justify-center mb-8 animate-pulse-glow relative overflow-hidden">
            <div className="absolute inset-0 travel-shimmer opacity-30"></div>
            <svg className="w-12 h-12 text-white animate-travel-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-travel-navy mb-4">
            ¡Bienvenido Aventurero!
          </h1>
          <p className="text-muted-foreground text-xl mb-6">
            Tu próxima aventura está a punto de comenzar
          </p>
          <div className="flex items-center justify-center space-x-6 text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-travel-ocean" />
              <span>150+ Destinos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="w-5 h-5 text-travel-ocean" />
              <span>Viajes Premium</span>
            </div>
          </div>
          <button
            onClick={() => setCurrentStep('login')}
            className="text-travel-ocean hover:text-travel-navy transition-colors font-medium"
          >
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === '2fa') {
    return (
      <TwoFactorAuth
        email={userEmail}
        onBack={handleBackToLogin}
        onVerify={handleTwoFactorVerify}
      />
    );
  }

  return (
    <LoginForm
      onEmailLogin={handleEmailLogin}
      onSocialLogin={handleSocialLogin}
    />
  );
};

export default Index;
