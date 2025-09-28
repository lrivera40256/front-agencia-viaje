import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, RefreshCw, MapPin, Plane } from 'lucide-react';
import travelHeroBg from '@/assets/travel-hero-bg.jpg';

interface TwoFactorAuthProps {
	email: string;
	onBack: () => void;
	onVerify: (code: string) => Promise<void>;
}

export function TwoFactorAuth({ email, onBack, onVerify }: TwoFactorAuthProps) {
	const [code, setCode] = useState(['', '', '', '', '', '']);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [resendTimer, setResendTimer] = useState(30);
	const [canResend, setCanResend] = useState(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		inputRefs.current[0]?.focus();

		const timer = setInterval(() => {
			setResendTimer((prev) => {
				if (prev <= 1) {
					setCanResend(true);
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const tryAutoSubmit = (digits: string[]) => {
		if (digits.every((d) => d !== '')) {
			handleVerify(digits.join(''));
		}
	};

	const handleInputChange = (index: number, value: string) => {
		// Solo un dígito numérico
		const v = value.replace(/\D/g, '').slice(0, 1);
		const newCode = [...code];
		newCode[index] = v;
		setCode(newCode);
		setError('');

		if (v && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}

		tryAutoSubmit(newCode);
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
		if (e.key === 'Enter' && code.every((d) => d !== '')) {
			e.preventDefault();
			handleVerify(code.join(''));
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');

		const newCode = [...code];
		digits.forEach((digit, i) => {
			if (i < 6) newCode[i] = digit;
		});

		setCode(newCode);

		const nextEmptyIndex = newCode.findIndex((d) => d === '');
		const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
		inputRefs.current[focusIndex]?.focus();

		tryAutoSubmit(newCode);
	};

	const handleVerify = async (verificationCode: string) => {
		setIsLoading(true);
		setError('');
		try {
			await onVerify(verificationCode);
			// Si no lanza error, el padre cierra este componente
		} catch (e: any) {
			setError(e?.message || 'Código incorrecto. Inténtalo de nuevo.');
			setCode(['', '', '', '', '', '']);
			inputRefs.current[0]?.focus();
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendCode = () => {
		setCanResend(false);
		setResendTimer(30);
		setError('');

		const timer = setInterval(() => {
			setResendTimer((prev) => {
				if (prev <= 1) {
					setCanResend(true);
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

	return (
		<div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
			<div
				className="absolute inset-0 travel-hero-bg"
				style={{ backgroundImage: `url(${travelHeroBg})` }}
			/>
			<div className="absolute inset-0 travel-overlay" />

			<div className="absolute top-20 right-20 text-travel-sand/20 floating-element">
				<Plane className="w-10 h-10 transform rotate-12" />
			</div>
			<div className="absolute bottom-32 left-32 text-travel-sand/15 floating-element">
				<MapPin className="w-6 h-6" />
			</div>

			<Card className="w-full max-w-md auth-card-blur auth-glow animate-fade-in relative z-10">
				<CardHeader className="text-center pb-8">
					<button
						onClick={onBack}
						className="absolute left-6 top-6 p-3 rounded-full hover:bg-travel-ocean/20 transition-colors border border-travel-ocean/30"
					>
						<ArrowLeft className="w-5 h-5 text-travel-ocean" />
					</button>

					<div className="mx-auto w-20 h-20 travel-gradient rounded-full flex items-center justify-center mb-6 animate-pulse-glow relative overflow-hidden">
						<div className="absolute inset-0 travel-shimmer opacity-30"></div>
						<Shield className="w-10 h-10 text-white animate-travel-bounce" />
					</div>
					<CardTitle className="text-2xl font-bold text-travel-navy">
						Código de Seguridad
					</CardTitle>
					<p className="text-muted-foreground text-sm">
						Para proteger tu aventura, ingresa el código de 6 dígitos
						<br />
						enviado a{' '}
						<span className="font-medium text-travel-ocean">{maskedEmail}</span>
					</p>
					<div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground mt-3">
						<Shield className="w-4 h-4 text-travel-ocean" />
						<span>Seguridad de primer nivel</span>
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="flex justify-center space-x-3">
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								maxLength={1}
								value={digit}
								onChange={(e) => handleInputChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={handlePaste}
								className={`w-14 h-16 text-center text-xl font-bold bg-auth-input border-2 rounded-xl transition-all duration-300 focus:outline-none focus:border-travel-ocean focus:ring-4 focus:ring-travel-ocean/20 focus:scale-105 ${
									error
										? 'border-destructive animate-pulse'
										: 'border-auth-input-border hover:border-travel-ocean/50'
								} ${
									digit
										? 'border-travel-ocean bg-travel-ocean/10 text-travel-ocean shadow-lg'
										: 'text-foreground'
								}`}
								disabled={isLoading}
							/>
						))}
					</div>

					{error && (
						<p className="text-sm text-destructive text-center animate-fade-in">
							{error}
						</p>
					)}

					<Button
						onClick={() => handleVerify(code.join(''))}
						disabled={code.some((d) => d === '') || isLoading}
						className="w-full travel-gradient hover:opacity-90 transition-all duration-300 font-semibold disabled:opacity-50 h-12 relative overflow-hidden group"
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
								<Shield className="w-5 h-5" />
								<span>Verificar y Continuar</span>
							</div>
						)}
					</Button>

					<div className="text-center space-y-2">
						<p className="text-sm text-muted-foreground">¿No recibiste el código?</p>
						<button
							onClick={handleResendCode}
							disabled={!canResend}
							className="text-sm font-medium text-travel-ocean hover:text-travel-navy disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 mx-auto"
						>
							<RefreshCw className={`w-4 h-4 ${!canResend ? 'animate-spin' : ''}`} />
							<span>
								{canResend ? 'Reenviar código' : `Reenviar en ${resendTimer}s`}
							</span>
						</button>
					</div>

					<div className="text-center text-xs text-muted-foreground border-t pt-4">
						<div className="flex items-center justify-center space-x-4">
							<div className="flex items-center space-x-1">
								<Shield className="w-3 h-3 text-travel-ocean" />
								<span>Código expira en 10 min</span>
							</div>
							<div className="flex items-center space-x-1">
								<Plane className="w-3 h-3 text-travel-ocean" />
								<span>Tu aventura te espera</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
