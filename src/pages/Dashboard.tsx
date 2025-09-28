import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plane, Calendar, Star, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';

const quickStats = [
	{
		title: 'Próximo Viaje',
		value: 'Bali, Indonesia',
		subtitle: 'En 15 días',
		icon: Plane,
		color: 'text-travel-ocean',
	},
	{
		title: 'Destinos Visitados',
		value: '12',
		subtitle: 'Este año',
		icon: MapPin,
		color: 'text-travel-navy',
	},
	{
		title: 'Puntos Acumulados',
		value: '2,450',
		subtitle: '+150 este mes',
		icon: Star,
		color: 'text-amber-500',
	},
	{
		title: 'Reservas Activas',
		value: '3',
		subtitle: 'Próximos 6 meses',
		icon: Calendar,
		color: 'text-green-500',
	},
];

const popularDestinations = [
	{
		name: 'Maldivas',
		price: 'desde $2,299',
		image: '🏝️',
		rating: 4.9,
		badge: 'Oferta',
	},
	{
		name: 'París, Francia',
		price: 'desde $1,899',
		image: '🗼',
		rating: 4.8,
		badge: 'Popular',
	},
	{
		name: 'Tokio, Japón',
		price: 'desde $2,599',
		image: '🏯',
		rating: 4.9,
		badge: 'Nuevo',
	},
	{
		name: 'Santorini, Grecia',
		price: 'desde $1,799',
		image: '🌅',
		rating: 4.7,
		badge: 'Recomendado',
	},
];

const recentActivity = [
	{
		action: 'Reserva confirmada',
		details: 'Hotel Gran Meliá en Bali',
		time: 'Hace 2 horas',
		icon: Calendar,
	},
	{
		action: 'Puntos ganados',
		details: '+150 puntos por reserva',
		time: 'Hace 3 horas',
		icon: Star,
	},
	{
		action: 'Nuevo destino guardado',
		details: 'Machu Picchu, Perú',
		time: 'Ayer',
		icon: MapPin,
	},
];

export default function Dashboard() {
	return (
		<div className="flex-1 space-y-6 p-6">
			{/* Welcome Section */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-travel-navy">¡Bienvenida, María! 👋</h1>
					<p className="text-muted-foreground">Tu próxima aventura te está esperando</p>
				</div>
				<Button className="bg-travel-ocean hover:bg-travel-navy">
					<Plane className="w-4 h-4 mr-2" />
					Planear Nuevo Viaje
				</Button>
			</div>

			{/* Quick Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{quickStats.map((stat, index) => (
					<Card key={index} className="hover:shadow-md transition-shadow">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</CardTitle>
							<stat.icon className={`h-4 w-4 ${stat.color}`} />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-travel-navy">{stat.value}</div>
							<p className="text-xs text-muted-foreground">{stat.subtitle}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Popular Destinations */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-travel-navy">
									Destinos Populares
								</CardTitle>
								<CardDescription>
									Los favoritos de nuestros viajeros
								</CardDescription>
							</div>
							<Button variant="ghost" size="sm">
								Ver todos
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 sm:grid-cols-2">
							{popularDestinations.map((destination, index) => (
								<div
									key={index}
									className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
								>
									<div className="text-3xl">{destination.image}</div>
									<div className="flex-1 space-y-1">
										<div className="flex items-center gap-2">
											<h4 className="font-semibold text-travel-navy">
												{destination.name}
											</h4>
											<Badge variant="secondary" className="text-xs">
												{destination.badge}
											</Badge>
										</div>
										<p className="text-sm text-travel-ocean font-medium">
											{destination.price}
										</p>
										<div className="flex items-center gap-1">
											<Star className="w-3 h-3 fill-amber-400 text-amber-400" />
											<span className="text-xs text-muted-foreground">
												{destination.rating}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card>
					<CardHeader>
						<CardTitle className="text-travel-navy">Actividad Reciente</CardTitle>
						<CardDescription>Tus últimas acciones</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((activity, index) => (
								<div key={index} className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-travel-ocean-light rounded-full flex items-center justify-center flex-shrink-0">
										<activity.icon className="w-4 h-4 text-travel-ocean" />
									</div>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium text-travel-navy">
											{activity.action}
										</p>
										<p className="text-sm text-muted-foreground">
											{activity.details}
										</p>
										<p className="text-xs text-muted-foreground flex items-center gap-1">
											<Clock className="w-3 h-3" />
											{activity.time}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle className="text-travel-navy">Acciones Rápidas</CardTitle>
					<CardDescription>Todo lo que necesitas al alcance de un clic</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Button
							variant="outline"
							className="h-20 flex-col space-y-2 hover:bg-travel-ocean-light hover:border-travel-ocean"
						>
							<MapPin className="w-6 h-6 text-travel-ocean" />
							<span>Explorar Destinos</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex-col space-y-2 hover:bg-travel-ocean-light hover:border-travel-ocean"
						>
							<Calendar className="w-6 h-6 text-travel-ocean" />
							<span>Ver Reservas</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex-col space-y-2 hover:bg-travel-ocean-light hover:border-travel-ocean"
						>
							<Star className="w-6 h-6 text-travel-ocean" />
							<span>Ofertas Especiales</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex-col space-y-2 hover:bg-travel-ocean-light hover:border-travel-ocean"
						>
							<Users className="w-6 h-6 text-travel-ocean" />
							<span>Viajes en Grupo</span>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
