import { useState } from 'react';
import axios from "axios";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SocialButton } from './SocialButton';
import { Mail, Lock, Eye, EyeOff, MapPin, Plane } from 'lucide-react';
import travelHeroBg from '@/assets/travel-hero-bg.jpg';
import { TwoFactorAuth } from './TwoFactorAuth';
import { loginWithGithub, loginWithGoogle, loginWithMicrosoft } from './AuthProvider';
import { login, validate2FA } from '@/services/securityService';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [sessionId, setSessionId] = useState('');
	const navigate = useNavigate();


	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const extractAxiosMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as any;
    if (typeof data === 'string' && data.trim()) return data;
    if (data && typeof data === 'object') return data.message || data.error || JSON.stringify(data);
    const text = typeof (err.request as any)?.responseText === 'string' ? (err.request as any).responseText : '';
    if (text) return text;
    return err.response?.statusText || err.message || 'Error de autenticación';
  }
  return (err as any)?.message || 'Error de autenticación';
};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Subiendo', { email, password });

		// limpiar errores
		setErrors({ email: '', password: '' });

		// validaciones
		let hasErrors = false;
		const newErrors = { email: '', password: '' };

		if (!email.trim()) {
			newErrors.email = 'El email es requerido';
			hasErrors = true;
		} else if (!validateEmail(email)) {
			newErrors.email = 'Ingresa un email válido';
			hasErrors = true;
		}

		if (!password) {
			newErrors.password = 'La contraseña es requerida';
			hasErrors = true;
		} else if (password.length < 4) {
			newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
			hasErrors = true;
		}

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		setIsLoading(true);
		try {
			const res = await login(email, password);
			console.log(res);
			if (res?.['2fa_required'] && res.sessionId) {
				setSessionId(res.sessionId);
				setShowTwoFactor(true); // muestra el componente de 2FA
			} else {
				setErrors({ email: 'No se pudo iniciar sesión', password: '' });
			}
		} catch (err: any) {
			const msg = extractAxiosMessage(err);
			setErrors({
				email: 'Credenciales inválidas',
				password: msg,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{showTwoFactor ? (
      <TwoFactorAuth
        email={email}
        onBack={() => setShowTwoFactor(false)}
        onVerify={async (code: string) => {
          try {
            const res = await validate2FA(sessionId, code);
            if (!res.valid) throw new Error("Código inválido");
            // Log del token para verificar que llega
            console.log("Token recibido (JWT):", res.token);
			localStorage.setItem('token', res.token);
            setShowTwoFactor(false);
            navigate('/seguridad', { replace: true });
          } catch (err) {
            const msg = extractAxiosMessage(err);
            const m = msg.toLowerCase();

            // Si expiró o se excedieron intentos (o sesión inválida), cerrar 2FA y volver al login
            if (
              m.includes('expirad') ||          // "expirada"
              m.includes('excedid') ||          // "excedidos"
              (m.includes('sesión') && m.includes('no encontr')) || // "Sesión no encontrada"
              (m.includes('session') && m.includes('not found'))
            ) {
              setShowTwoFactor(false);
              setSessionId('');
              // mostrar el mensaje en el login
              setErrors({ email: '', password: msg });
              return; // no propagar al 2FA
            }

            // Para otros errores (código incorrecto con intentos restantes), mostrar en el 2FA
            throw new Error(msg);
          }
        }}
				/>
			) : (
				<div className="w-screen h-screen flex items-center justify-center px-4 py-2 relative overflow-hidden travel-gradient">
					{/* Todo tu JSX del formulario de login aquí */}
					<div
						className="absolute inset-0 travel-hero-bg"
						style={{ backgroundImage: `url(${travelHeroBg})` }}
					/>
					<div className="absolute inset-0 travel-overlay" />

					<Card className="w-full max-w-sm auth-card-blur auth-glow animate-fade-in relative z-10 max-h-[90vh] overflow-hidden">
						<CardHeader className="text-center pb-3">
							<div className="mx-auto mb-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
								<Plane className="w-5 h-5 text-white" />
							</div>
							<CardTitle className="text-xl text-gray-800 mb-1">
								Explora el Mundo
							</CardTitle>
							<CardDescription className="text-sm text-gray-600 mb-2">
								Inicia tu próxima aventura
							</CardDescription>
							<div className="flex items-center justify-center text-xs text-gray-500">
								<MapPin className="w-3 h-3 mr-1" />
								Más de 150 destinos esperándote
							</div>
						</CardHeader>

						<CardContent className="space-y-3 pb-4">
							<div className="space-y-2">
								<SocialButton
									provider="google"
									onClick={() => loginWithGoogle(navigate)}
									className="w-full py-2 text-sm"
								/>
								<SocialButton
									provider="microsoft"
									onClick={() => loginWithMicrosoft(navigate)}
									className="w-full py-2 text-sm"
								/>
								<SocialButton
									provider="github"
									onClick={() => loginWithGithub(navigate)}
									className="w-full py-2 text-sm"
								/>
							</div>

							<div className="relative py-1">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t border-gray-300" />
								</div>
								<div className="relative flex justify-center text-xs">
									<span className="bg-white px-2 text-gray-500">
										O CONTINÚA CON EMAIL
									</span>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="space-y-3">
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
										type={showPassword ? 'text' : 'password'}
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
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>

								<Button
									type="submit"
									className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 mt-3"
									disabled={isLoading}
								>
									{isLoading ? 'Cargando...' : 'Comenzar Aventura'}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
}
