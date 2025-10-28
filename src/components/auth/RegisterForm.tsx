import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plane, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '@/features/users';

import * as z from 'zod';

const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
		.max(100),
	email: z.string().trim().email({ message: 'Email inválido' }).max(255),
	password: z
		.string()
		.min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
		.max(100),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await registerUser(data);
			toast({
				title: '¡Registro exitoso!',
				description: 'Ahora inicia sesión para continuar',
			});
			navigate('/login', { replace: true });
		} catch (error: any) {
			const msg =
				error?.response?.data?.message ||
				error?.message ||
				'Hubo un problema al crear tu cuenta';
			toast({
				title: 'Error',
				description: msg,
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/80 flex items-center justify-center p-4">
			<Card className="w-full max-w-md shadow-2xl border-0">
				<CardContent className="pt-8 pb-6 px-8">
					{/* Icon */}
					<div className="flex justify-center mb-6">
						<div className="bg-primary rounded-full p-4">
							<Plane className="w-8 h-8 text-primary-foreground" />
						</div>
					</div>

					{/* Header */}
					<div className="text-center mb-6">
						<h1 className="text-3xl font-bold text-foreground mb-2">
							Explora el Mundo
						</h1>
						<p className="text-muted-foreground mb-1">Inicia tu próxima aventura</p>
						<p className="text-sm text-muted-foreground/80">
							✈️ Más de 150 destinos esperándote
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* Name Field */}
						<div className="space-y-2">
							<Label htmlFor="name" className="text-sm font-medium">
								Nombre
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="Tu nombre completo"
								{...register('name')}
								className={errors.name ? 'border-destructive' : ''}
							/>
							{errors.name && (
								<p className="text-xs text-destructive">{errors.name.message}</p>
							)}
						</div>

						{/* Email Field */}
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-medium">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="tu@email.com"
								{...register('email')}
								className={errors.email ? 'border-destructive' : ''}
							/>
							{errors.email && (
								<p className="text-xs text-destructive">{errors.email.message}</p>
							)}
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<Label htmlFor="password" className="text-sm font-medium">
								Contraseña
							</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									{...register('password')}
									className={
										errors.password ? 'border-destructive pr-10' : 'pr-10'
									}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{showPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-xs text-destructive">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<Button
							type="submit"
							className="w-full mt-6"
							size="lg"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Creando cuenta...' : 'Comenzar Aventura'}
						</Button>
					</form>

					<div className="text-center mt-6">
						<p className="text-sm text-muted-foreground">
							¿Ya tienes cuenta?{' '}
							<Link to="/login" className="text-primary hover:underline font-medium">
								Inicia sesión
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Register;
