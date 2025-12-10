import { NavLink, useLocation } from 'react-router-dom';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
	useSidebar,
} from '@/components/ui/sidebar';
import {
	Plane,
	Star,
	User,
	Settings,
	Shield,
	Home,
	Car,
	Hotel,
	MapPin,
	Truck,
	LogOut,
	Zap,
	Activity,
	Calendar,
	CreditCard,
	Users,
	Compass,
	ChevronRight,
	Package,
	Briefcase,
	Wand2,
} from 'lucide-react';
import { useProfile } from '@/features/profile/contexts/ProfileContext';
import { useState } from 'react';

const mainItems = [
	{ title: 'Inicio', url: '/', icon: Home },
	{ title: 'Seguridad', url: '/seguridad', icon: Shield },
];

const travelManagementItems = [
	{ title: 'Viajes', url: '/viajes', icon: Briefcase },
	{ title: 'Trayectos', url: '/trayectos', icon: MapPin },
	{ title: 'Cuotas', url: '/cuotas', icon: Star },
];

const accommodationItems = [
	{ title: 'Habitaciones', url: '/habitaciones', icon: Hotel },
];

const transportItems = [
	{ title: 'Vehículos', url: '/vehiculos', icon: Car },
	{ title: 'Itinerarios Transporte', url: '/itinerarios-transporte', icon: Truck },
	{ title: 'Servicios Transporte', url: '/servicio-transporte', icon: Zap },
];

const otherItems = [
	{ title: 'Actividades', url: '/actividades', icon: Activity },
	{ title: 'Planes', url: '/plan', icon: Calendar },
	{ title: 'Clientes', url: '/clientes', icon: Users },
	{ title: 'Usuarios', url: '/usuarios', icon: Compass },
	{ title: 'Tarjetas Bancarias', url: '/tarjetas', icon: CreditCard },
];

const quickItems = [
	// { title: 'Ofertas Especiales', url: '/ofertas', icon: Star },
	// { title: "Favoritos", url: "/favoritos", icon: Heart },
	// { title: "Tickets", url: "/tickets", icon: Ticket },
];

const accountItems = [
	{ title: 'Mi Perfil', url: '/perfil', icon: User },
	// { title: 'Configuración', url: '/configuracion', icon: Settings },
];

export function AppSidebar() {
	const { state } = useSidebar();
	const location = useLocation();
	const currentPath = location.pathname;
	const { profile } = useProfile();
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({
		travels: false,
		myTravels: false,
		travelManagement: false,
		accommodation: false,
		transport: false,
		others: false,
	});

	const toggleSection = (section: string) => {
		setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
	};

	const isRouteActive = (path: string) => {
		// Para rutas exactas sin parámetros
		if (!path.includes(':')) {
			return currentPath === path;
		}
		// Para rutas con parámetros
		return currentPath === path || currentPath.startsWith(path + '/');
	};

	const getNavCls = (path: string) => {
		const isActive = isRouteActive(path);
		return isActive
			? 'bg-travel-ocean-light text-travel-ocean font-semibold border-r-4 border-travel-ocean shadow-md'
			: 'hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors';
	};

	const isCollapsed = state === 'collapsed';

	return (
		<Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
			<SidebarContent className="bg-card">
				{/* Company Logo/Brand */}
				<div className="p-4 border-b">
					{!isCollapsed ? (
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-travel-ocean rounded-lg flex items-center justify-center">
								<Plane className="w-5 h-5 text-white" />
							</div>
							<div>
								<h2 className="font-bold text-travel-navy">TravelPro</h2>
								<p className="text-xs text-muted-foreground">Tu próxima aventura</p>
							</div>
						</div>
					) : (
						<div className="w-8 h-8 bg-travel-ocean rounded-lg flex items-center justify-center mx-auto">
							<Plane className="w-5 h-5 text-white" />
						</div>
					)}
				</div>

				{/* Main Navigation */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-travel-navy font-semibold">
						{!isCollapsed && 'Principal'}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{mainItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink to={item.url} className={getNavCls(item.url)}>
											<item.icon className="h-4 w-4 min-w-4" />
											{!isCollapsed && <span>{item.title}</span>}
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Quick Access */}
				{/* <SidebarGroup>
					<SidebarGroupLabel className="text-travel-navy font-semibold">
						{!isCollapsed && 'Acceso Rápido'}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{quickItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink to={item.url} end className={getNavCls}>
											<item.icon className="h-4 w-4 min-w-4" />
											{!isCollapsed && <span>{item.title}</span>}
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup> */}

				{/* CRUDs */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-travel-navy font-semibold">
						{!isCollapsed && 'Gestión'}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{/* Viajes - Collapsible con subsecciones */}
							<SidebarMenuItem>
								<SidebarMenuButton 
									onClick={() => toggleSection('travels')}
									className="cursor-pointer"
								>
									<Package className="h-4 w-4 min-w-4" />
									{!isCollapsed && (
										<>
											<span>Viajes</span>
											<ChevronRight 
												className={`ml-auto h-4 w-4 transition-transform ${openSections.travels ? 'rotate-90' : ''}`} 
											/>
										</>
									)}
								</SidebarMenuButton>
								{!isCollapsed && openSections.travels && (
									<SidebarMenuSub>
										{/* Todos los viajes */}
										<SidebarMenuSubItem>
											<SidebarMenuSubButton asChild>
												<NavLink to="/travel-packages" className={getNavCls('/travel-packages')}>
													<Package className="h-4 w-4" />
													<span>Todos los Viajes</span>
												</NavLink>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>

										{/* Mis Viajes - Collapsible submenu */}
										{profile?.user?._id && (
											<SidebarMenuSubItem>
												<SidebarMenuSubButton
													onClick={() => toggleSection('myTravels')}
													className="cursor-pointer p-0"
												>
													<div className="flex items-center gap-2 w-full px-2 py-1.5">
														<Plane className="h-4 w-4 flex-shrink-0" />
														<span className="text-sm flex-1">Mis Viajes</span>
														<ChevronRight 
															className={`h-3 w-3 transition-transform flex-shrink-0 ${openSections.myTravels ? 'rotate-90' : ''}`} 
														/>
													</div>
												</SidebarMenuSubButton>
												
												{/* Subsecciones de Mis Viajes */}
												{openSections.myTravels && (
													<SidebarMenuSub className="ml-2">
														<SidebarMenuSubItem>
															<SidebarMenuSubButton asChild>
																<NavLink to={`/travel-packages/${profile.user._id}`} className={getNavCls(`/travel-packages/${profile.user._id}`)}>
																	<Briefcase className="h-4 w-4" />
																	<span>Viajes Activos</span>
																</NavLink>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>

														<SidebarMenuSubItem>
															<SidebarMenuSubButton asChild>
																<NavLink to={`/pagos-clientes/${profile.user._id}`} className={getNavCls(`/pagos-clientes/${profile.user._id}`)}>
																	<CreditCard className="h-4 w-4" />
																	<span>Viajes Pagando</span>
																</NavLink>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													</SidebarMenuSub>
												)}
											</SidebarMenuSubItem>
										)}

										{/* Personalizar Viaje */}
										<SidebarMenuSubItem>
											<SidebarMenuSubButton asChild>
												<NavLink to="/form" className={getNavCls('/form')}>
													<Wand2 className="h-4 w-4" />
													<span>Personalizar Viaje</span>
												</NavLink>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>

							{/* Gestión de Viajes - Collapsible */}
							<SidebarMenuItem>
								<SidebarMenuButton 
									onClick={() => toggleSection('travelManagement')}
									className="cursor-pointer"
								>
									<Briefcase className="h-4 w-4 min-w-4" />
									{!isCollapsed && (
										<>
											<span>Gestión de Viajes</span>
											<ChevronRight 
												className={`ml-auto h-4 w-4 transition-transform ${openSections.travelManagement ? 'rotate-90' : ''}`} 
											/>
										</>
									)}
								</SidebarMenuButton>
								{!isCollapsed && openSections.travelManagement && (
									<SidebarMenuSub>
										{travelManagementItems.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton asChild>
													<NavLink to={item.url} className={getNavCls(item.url)}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
													</NavLink>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>

							{/* Alojamiento - Collapsible */}
							<SidebarMenuItem>
								<SidebarMenuButton 
									onClick={() => toggleSection('accommodation')}
									className="cursor-pointer"
								>
									<Hotel className="h-4 w-4 min-w-4" />
									{!isCollapsed && (
										<>
											<span>Alojamiento</span>
											<ChevronRight 
												className={`ml-auto h-4 w-4 transition-transform ${openSections.accommodation ? 'rotate-90' : ''}`} 
											/>
										</>
									)}
								</SidebarMenuButton>
								{!isCollapsed && openSections.accommodation && (
									<SidebarMenuSub>
										{accommodationItems.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton asChild>
													<NavLink to={item.url} className={getNavCls(item.url)}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
													</NavLink>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>

							{/* Transporte - Collapsible */}
							<SidebarMenuItem>
								<SidebarMenuButton 
									onClick={() => toggleSection('transport')}
									className="cursor-pointer"
								>
									<Car className="h-4 w-4 min-w-4" />
									{!isCollapsed && (
										<>
											<span>Transporte</span>
											<ChevronRight 
												className={`ml-auto h-4 w-4 transition-transform ${openSections.transport ? 'rotate-90' : ''}`} 
											/>
										</>
									)}
								</SidebarMenuButton>
								{!isCollapsed && openSections.transport && (
									<SidebarMenuSub>
										{transportItems.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton asChild>
													<NavLink to={item.url} className={getNavCls(item.url)}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
													</NavLink>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>

							{/* Otros - Collapsible */}
							<SidebarMenuItem>
								<SidebarMenuButton 
									onClick={() => toggleSection('others')}
									className="cursor-pointer"
								>
									<Settings className="h-4 w-4 min-w-4" />
									{!isCollapsed && (
										<>
											<span>Otros</span>
											<ChevronRight 
												className={`ml-auto h-4 w-4 transition-transform ${openSections.others ? 'rotate-90' : ''}`} 
											/>
										</>
									)}
								</SidebarMenuButton>
								{!isCollapsed && openSections.others && (
									<SidebarMenuSub>
										{otherItems.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton asChild>
													<NavLink to={item.url} className={getNavCls(item.url)}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
													</NavLink>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Account */}
				<div className="mt-auto">
					<SidebarGroup>
						<SidebarGroupLabel className="text-travel-navy font-semibold">
							{!isCollapsed && 'Cuenta'}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{accountItems.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<NavLink to={item.url} className={getNavCls(item.url)}>
												<item.icon className="h-4 w-4 min-w-4" />
												{!isCollapsed && <span>{item.title}</span>}
											</NavLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
