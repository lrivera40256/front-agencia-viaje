import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/features/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search, Bell, User, Settings, LogOut, Plane, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/features/auth/contexts/AuthProvider';

export function AppNavbar() {
	const { profile, isLoading } = useProfile();
	const [notifications, setNotifications] = useState(3);
	const navigate = useNavigate();
	const { logout } = useAuthContext();
	

	useEffect(() => {
		
	}, []);
	return (
		<header className="h-16 border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
			<div className="flex items-center justify-between h-full px-4">
				{/* Left Section */}
				<div className="flex items-center space-x-4">
					<SidebarTrigger className="text-travel-navy hover:bg-travel-ocean-light hover:text-travel-ocean" />

					{/* Search Bar */}
					<div className="relative hidden md:block">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<Input
							placeholder="Buscar destinos, hoteles, vuelos..."
							className="pl-10 w-80 bg-muted/50 border-0 focus:bg-white focus:ring-2 focus:ring-travel-ocean/20"
						/>
					</div>
				</div>

				{/* Center Section - Quick Stats */}
				<div className="hidden lg:flex items-center space-x-6">
					<div className="flex items-center space-x-2 text-sm">
						<MapPin className="w-4 h-4 text-travel-ocean" />
						<span className="text-muted-foreground">150+ Destinos</span>
					</div>
					<div className="flex items-center space-x-2 text-sm">
						<Plane className="w-4 h-4 text-travel-ocean" />
						<span className="text-muted-foreground">Viajes Premium</span>
					</div>
				</div>

				{/* Right Section */}
				<div className="flex items-center space-x-4">
					{/* Search Button for Mobile */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-travel-navy hover:bg-travel-ocean-light hover:text-travel-ocean"
					>
						<Search className="w-4 h-4" />
					</Button>

					{/* Notifications */}
					<Button
						variant="ghost"
						size="icon"
						className="relative text-travel-navy hover:bg-travel-ocean-light hover:text-travel-ocean"
					>
						<Bell className="w-4 h-4" />
						{notifications > 0 && (
							<span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
								{notifications}
							</span>
						)}
					</Button>

					{/* User Menu */}
					<DropdownMenu>
						  <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    {/* <AvatarImage 
                                        src={profile?.photo?.url || "/avatars/01.png"} 
                                        alt={profile?.user.name || "Usuario"} 
                                    /> */}
                                    <AvatarFallback className="bg-travel-ocean text-white">
                                        {/* {profile?.user.name 
                                            ? profile.user.name.charAt(0).toUpperCase()
                                            : <User className="w-4 h-4" />
                                        } */}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									{/* <p className="text-sm font-medium leading-none">{profile?.user.name || 'Cargando...'}</p> */}
									<p className="text-xs leading-none text-muted-foreground">
										{/* {profile?.user.email || 'Cargando...'} */}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => navigate('/perfil')}
							>
								<User className="mr-2 h-4 w-4" />
								<span>Mi Perfil</span>
							</DropdownMenuItem> 
						
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={async () => {
									await logout();
									navigate('/login');
								}}
								className="cursor-pointer text-destructive focus:text-destructive"
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Cerrar Sesión</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
