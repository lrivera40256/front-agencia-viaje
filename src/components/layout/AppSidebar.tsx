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
} from 'lucide-react';

const mainItems = [
	{ title: 'Inicio', url: '/', icon: Home },
	{ title: 'Seguridad', url: '/seguridad', icon: Shield },
];

const crudItems = [
	{ title: 'Viajes', url: '/viajes', icon: Plane },
	{ title: 'Trayectos', url: '/trayectos', icon: MapPin },
	{ title: 'Cuotas', url: '/cuotas', icon: Star },
	{ title: 'Habitaciones', url: '/habitaciones', icon: Hotel },
	{ title: 'Vehículos', url: '/vehiculos', icon: Car },
	{ title: 'Itinerarios Transporte', url: '/itinerarios-transporte', icon: Truck },
	{ title: 'Servicios Transporte', url: '/servicios-transporte', icon: Zap },
	{ title: 'Actividades', url: '/actividades', icon: Activity },
	{ title: 'Planes', url: '/planes', icon: Calendar },
	{ title: 'Clientes', url: '/clientes', icon: Users },
	{ title: 'Tarjetas Bancarias', url: '/tarjetas-bancarias', icon: CreditCard },
	{ title: 'Usuarios', url: '/usuarios', icon: Compass },
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

	const isRouteActive = (path: string) => {
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
							{crudItems.map((item) => (
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
