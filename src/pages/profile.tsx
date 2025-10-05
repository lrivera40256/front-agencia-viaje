import { useEffect, useRef, useState } from 'react';
import { User, Mail, Phone, Edit2, Save, X, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
	getProfile,
	patchProfile,
	uploadProfilePhoto,
	saveOAuthPhotoUrl,
	resolvePhotoUrl,
	ProfileDto,
	toggle2FA,
	changeProfilePassword,
} from '@/services/profileService';
import { set } from 'date-fns';
import { LoadingOverlay } from '@/components/Loader';
import { useProfile } from '@/components/auth/ProfileProvider';

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [savingPhoto, setSavingPhoto] = useState(false);
	const [editedPhone, setEditedPhone] = useState('');
	const [isOauth, setIsOauth] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { profile, isLoading, refreshProfile } = useProfile();
	// 2FA + Password states
	const [twoFAEnabled, setTwoFAEnabled] = useState(false);
	const [pwCurrent, setPwCurrent] = useState('');
	const [pwNew, setPwNew] = useState('');
	const [pwNew2, setPwNew2] = useState('');

	useEffect(() => {
		const load = async () => {

			try {
				if (profile) {
					setEditedPhone(profile.phone || '');
					setIsOauth(!!profile.user?.isOauth);
					setTwoFAEnabled(!!profile.twoFactorEnabled);
				}
			} catch {
				toast({
					title: 'Error',
					description: 'No se pudo cargar el perfil',
					variant: 'destructive',
				});
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const handleEdit = () => setIsEditing(true);
	const handleCancel = () => {
		if (profile) setEditedPhone(profile.phone || '');
		setIsEditing(false);
	};
	const handleSave = async () => {
		if (!profile) return;
		setLoading(true);
		try {
			await patchProfile(profile._id, { phone: editedPhone });
			refreshProfile();
			setIsEditing(false);
			toast({ title: 'Perfil actualizado', description: 'Teléfono guardado.' });
		} catch {
			toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
		} finally {
			setLoading(false);
		}
	};

	const getInitials = (name?: string) =>
		(name || 'U')
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);

	const triggerFile = () => {
		if (isOauth) {
			toast({
				title: 'Foto (OAuth)',
				description: 'Este usuario usa foto remota. Sube otra para reemplazar.',
			});
		}
		fileInputRef.current?.click();
	};

	const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!/^image\//.test(file.type)) {
			toast({
				title: 'Archivo inválido',
				description: 'Debe ser imagen.',
				variant: 'destructive',
			});
			return;
		}
		if (file.size > 3 * 1024 * 1024) {
			toast({ title: 'Muy grande', description: 'Máx 3MB.', variant: 'destructive' });
			return;
		}
		if (!profile) return;
		setSavingPhoto(true);
		try {
			await uploadProfilePhoto(profile._id, file);
			refreshProfile();
			toast({ title: 'Foto actualizada', description: 'Imagen subida.' });
		} catch {
			toast({
				title: 'Error',
				description: 'No se pudo subir la foto.',
				variant: 'destructive',
			});
		} finally {
			setSavingPhoto(false);
			e.target.value = '';
		}
	};

	// Registrar URL (flujo OAuth)
	const registerOAuthPhoto = async (url: string) => {
		if (!profile) return;
		setSavingPhoto(true);
		try {
			const photo = await saveOAuthPhotoUrl(url);
			await patchProfile(profile._id, { photoId: photo._id });
			refreshProfile();
			toast({ title: 'Foto registrada', description: 'URL guardada.' });
		} catch {
			toast({ title: 'Error', description: 'No se guardó la URL.', variant: 'destructive' });
		} finally {
			setLoading(false);
		}
	};

	const handleToggle2FA = async () => {
		if (!profile) return;
		try {
			setLoading(true);
			const res = await toggle2FA(profile._id, !twoFAEnabled);
			setTwoFAEnabled(res.twoFactorEnabled);
			refreshProfile();
			toast({ title: '2FA', description: res.twoFactorEnabled ? 'Activado' : 'Desactivado' });
		} catch {
			toast({
				title: 'Error',
				description: 'No se pudo cambiar 2FA',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	// Change password
	const handleChangePassword = async () => {
		if (!profile) return;
		if (isOauth) {
			toast({ title: 'OAuth', description: 'No aplica.' });
			return;
		}
		if (!pwCurrent || !pwNew || !pwNew2) {
			toast({
				title: 'Campos vacíos',
				description: 'Completa todos.',
				variant: 'destructive',
			});
			return;
		}
		if (pwNew !== pwNew2) {
			toast({
				title: 'No coincide',
				description: 'Confirmación inválida',
				variant: 'destructive',
			});
			return;
		}
		try {
			setLoading(true);
			await changeProfilePassword(profile._id, pwCurrent, pwNew);
			toast({ title: 'Contraseña actualizada' });
			setPwCurrent('');
			setPwNew('');
			setPwNew2('');
		} catch {
			toast({ title: 'Error', description: 'No se pudo cambiar.', variant: 'destructive' });
		} finally {
			setLoading(false);
		}
	};




	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
			<div className="max-w-5xl mx-auto">
				{loading && <LoadingOverlay />}
				{profile && (
					<div>
						<Card className="mb-6 overflow-hidden border-primary/20">
							<div className="bg-gradient-to-r from-primary to-accent p-6 md:p-8">
								<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
									<div
										className="relative group cursor-pointer select-none"
										onClick={triggerFile}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												triggerFile();
											}
										}}
									>
										<Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-white/20 shadow-xl cursor-pointer overflow-hidden">
											<AvatarImage
												src={resolvePhotoUrl(profile)}
												alt={profile.user?.name}
												className="object-cover"
											/>
											<AvatarFallback className="bg-white/10 text-white text-3xl backdrop-blur-sm">
												{getInitials(profile.user?.name)}
											</AvatarFallback>
										</Avatar>
										<div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-white text-xs">
											{savingPhoto ? (
												<span>Subiendo...</span>
											) : (
												<>
													<Camera className="h-5 w-5 mb-1" />
													<span>Cambiar foto</span>
												</>
											)}
										</div>
										<input
											ref={fileInputRef}
											type="file"
											accept="image/*"
											hidden
											onChange={handleSelectFile}
										/>
									</div>

									<div className="flex-1 text-left">
										<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
											{profile.user?.name}
										</h1>
										<p className="text-white/90 text-lg mb-4">{profile.user?.email}</p>
										{!isEditing && (
											<div className="flex gap-3">
												<Button
													onClick={handleEdit}
													className="bg-white text-primary hover:bg-white/90 shadow-lg"
													disabled={savingPhoto}
												>
													<Edit2 className="mr-2 h-4 w-4" />
													Editar Perfil
												</Button>
												{isOauth && (
													<Button
														type="button"
														variant="outline"
														className="bg-white/20 text-white border-white/40 hover:bg-white/30"
														onClick={() =>
															registerOAuthPhoto(
																'https://avatars.githubusercontent.com/u/1?v=4'
															)
														}
														disabled={savingPhoto}
													>
														<Upload className="mr-2 h-4 w-4" />
														Registrar URL OAuth
													</Button>
												)}
											</div>
										)}
										<p className="mt-3 text-xs text-white/70">
											Tipo de cuenta: {isOauth ? 'OAuth' : 'Local'}
										</p>
									</div>
								</div>
							</div>
						</Card>

						<div className="grid gap-6 md:grid-cols-2">
							<Card className="border-primary/20">
								<CardHeader className="bg-muted/50">
									<CardTitle className="flex items-center gap-2 text-xl">
										<User className="h-5 w-5 text-primary" />
										Información Personal
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-6 space-y-4">
									<div className="space-y-1">
										<Label className="text-muted-foreground text-sm block text-left">
											Nombre Completo
										</Label>
										<p className="text-foreground font-semibold text-lg text-left">
											{profile.user?.name}
										</p>
									</div>
									<div className="space-y-1">
										<Label className="text-muted-foreground text-sm flex items-center gap-2 text-left">
											<Phone className="h-4 w-4" />
											Teléfono
										</Label>
										{isEditing ? (
											<Input
												value={editedPhone}
												onChange={(e) => setEditedPhone(e.target.value)}
												placeholder="+57 300 000 0000"
												className="border-primary/20"
											/>
										) : (
											<p className="text-foreground font-semibold text-lg text-left">
												{profile.phone || '—'}
											</p>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Contacto + Password + 2FA */}
							<Card className="border-primary/20">
								<CardHeader className="bg-muted/50">
									<CardTitle className="flex items-center gap-2 text-xl text-left">
										<Mail className="h-5 w-5 text-primary" />
										Información de Contacto
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-6 space-y-6">
									<div className="space-y-1">
										<Label className="text-muted-foreground text-sm block text-left">
											Correo Electrónico
										</Label>
										<p className="text-foreground font-semibold text-lg text-left">
											{profile.user?.email}
										</p>
									</div>

									<div className="space-y-1">
										<Label className="text-muted-foreground text-sm block text-left">
											Contraseña
										</Label>
										{isEditing ? (
											isOauth ? (
												<p className="text-xs text-muted-foreground">
													Cuenta OAuth
												</p>
											) : (
												<div className="space-y-2">
													<Input
														type="password"
														placeholder="Actual"
														value={pwCurrent}
														onChange={(e) => setPwCurrent(e.target.value)}
													/>
													<Input
														type="password"
														placeholder="Nueva"
														value={pwNew}
														onChange={(e) => setPwNew(e.target.value)}
													/>
													<Input
														type="password"
														placeholder="Confirmar nueva"
														value={pwNew2}
														onChange={(e) => setPwNew2(e.target.value)}
													/>
													<Button
														size="sm"
														type="button"
														onClick={handleChangePassword}
													>
														Cambiar
													</Button>
												</div>
											)
										) : (
											<p className="text-foreground font-semibold text-lg text-left">
												********
											</p>
										)}
									</div>

									<div className="space-y-1">
										<Label className="text-muted-foreground text-sm block text-left">
											2FA
										</Label>
										<div className="flex items-center gap-3">
											<button
												type="button"
												role="switch"
												aria-checked={twoFAEnabled}
												onClick={handleToggle2FA}
												disabled={isOauth}
												className={`relative w-16 h-8 rounded-full transition-colors duration-300
    ${isOauth ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${twoFAEnabled ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gray-300'}`}
											>
												<span
													className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow
      transition-transform duration-300 ${twoFAEnabled ? 'translate-x-8' : ''}`}
												/>
												<span
													className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold
      ${twoFAEnabled ? 'text-white' : 'text-gray-600'}`}
												>
													{twoFAEnabled ? 'ON' : 'OFF'}
												</span>
											</button>
											{isOauth && (
												<span className="text-xs text-muted-foreground">OAuth</span>
											)}
										</div>
									</div>

									{!isOauth && (
										<p className="text-xs text-muted-foreground">
											Cambia tu contraseña o activa el 2FA para mayor seguridad.
										</p>
									)}
									{isOauth && (
										<p className="text-xs text-muted-foreground">
											Contraseña y 2FA gestionados externamente (OAuth).
										</p>
									)}
								</CardContent>
							</Card>
						</div>

						{isEditing && (
							<Card className="mt-6 border-primary/20">
								<CardContent className="pt-6">
									<div className="flex gap-3 justify-end">
										<Button
											variant="outline"
											onClick={handleCancel}
											className="border-border"
										>
											<X className="mr-2 h-4 w-4" />
											Cancelar
										</Button>
										<Button
											onClick={handleSave}
											className="bg-primary"
											disabled={savingPhoto}
										>
											<Save className="mr-2 h-4 w-4" />
											Guardar Cambios
										</Button>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				)}

			</div>
		</div>
	);
};

export default Profile;
