import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
	Plane, 
	MapPin, 
	Calendar, 
	Users, 
	Star, 
	Search,
	Clock,
	Globe,
	Camera,
	Heart,
	TrendingUp,
	ArrowRight,
	Compass,
	Award,
	Shield
} from 'lucide-react';
import travelHeroBg from '@/assets/travel-hero-bg.jpg';

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const popularDestinations = [
		{
			id: 1,
			name: 'París, Francia',
			image: '/placeholder.svg',
			rating: 4.8,
			reviews: 2453,
			price: '€1,299',
			duration: '7 días',
			highlight: 'Ciudad del Amor'
		},
		{
			id: 2,
			name: 'Tokio, Japón',
			image: '/placeholder.svg',
			rating: 4.9,
			reviews: 1876,
			price: '€1,899',
			duration: '10 días',
			highlight: 'Cultura Milenaria'
		},
		{
			id: 3,
			name: 'Bali, Indonesia',
			image: '/placeholder.svg',
			rating: 4.7,
			reviews: 3241,
			price: '€899',
			duration: '5 días',
			highlight: 'Paraíso Tropical'
		},
		{
			id: 4,
			name: 'Nueva York, USA',
			image: '/placeholder.svg',
			rating: 4.6,
			reviews: 4567,
			price: '€1,599',
			duration: '6 días',
			highlight: 'La Gran Manzana'
		}
	];

	const featuredPackages = [
		{
			id: 1,
			title: 'Escapada Romántica',
			description: 'Paquetes perfectos para parejas',
			destinations: 12,
			icon: Heart,
			color: 'bg-pink-500'
		},
		{
			id: 2,
			title: 'Aventura Extrema',
			description: 'Para los más aventureros',
			destinations: 8,
			icon: TrendingUp,
			color: 'bg-orange-500'
		},
		{
			id: 3,
			title: 'Cultura y Historia',
			description: 'Descubre civilizaciones',
			destinations: 15,
			icon: Globe,
			color: 'bg-blue-500'
		},
		{
			id: 4,
			title: 'Fotografía',
			description: 'Los mejores paisajes',
			destinations: 10,
			icon: Camera,
			color: 'bg-green-500'
		}
	];

	const stats = [
		{ label: 'Destinos', value: '150+', icon: MapPin, color: 'text-blue-600' },
		{ label: 'Viajeros Felices', value: '25K+', icon: Users, color: 'text-green-600' },
		{ label: 'Años de Experiencia', value: '15+', icon: Award, color: 'text-purple-600' },
		{ label: 'Países', value: '45+', icon: Globe, color: 'text-orange-600' }
	];

	return (
		<div className="space-y-6">
			{/* Welcome Hero Section - Adaptado al layout */}
			<div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-20"
					style={{ backgroundImage: `url(${travelHeroBg})` }}
				/>
				<div className="relative p-8 md:p-12">
					<div className="max-w-4xl">
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
								<Compass className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-3xl md:text-4xl font-bold">
									¡Bienvenido a TravelPro!
								</h1>
								<p className="text-blue-100 text-lg">
									Tu centro de control para aventuras extraordinarias
								</p>
							</div>
						</div>
						
						{/* Quick Search */}
						<div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
							<div className="flex flex-col md:flex-row gap-3">
								<div className="flex-1 relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
									<Input
										placeholder="¿A dónde quieres ir hoy?"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30"
									/>
								</div>
								<Button className="bg-white text-blue-700 hover:bg-blue-50">
									<Plane className="w-4 h-4 mr-2" />
									Explorar
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<Card key={index} className="text-center hover:shadow-md transition-shadow">
						<CardContent className="pt-6">
							<div className={`mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3`}>
								<stat.icon className={`w-6 h-6 ${stat.color}`} />
							</div>
							<div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
							<div className="text-sm text-gray-600">{stat.label}</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Featured Categories */}
			<div>
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">Explora por Categorías</h2>
						<p className="text-gray-600">Encuentra el viaje perfecto para ti</p>
					</div>
					<Button variant="outline">
						Ver Todo
						<ArrowRight className="w-4 h-4 ml-2" />
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{featuredPackages.map((package_) => (
						<Card key={package_.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
							<CardHeader className="text-center pb-3">
								<div className={`mx-auto w-12 h-12 ${package_.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
									<package_.icon className="w-6 h-6 text-white" />
								</div>
								<CardTitle className="text-lg">{package_.title}</CardTitle>
								<CardDescription className="text-sm">{package_.description}</CardDescription>
							</CardHeader>
							<CardContent className="text-center pt-0">
								<Badge variant="secondary" className="mb-3">
									{package_.destinations} destinos
								</Badge>
								<div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors text-sm">
									Explorar
									<ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Popular Destinations */}
			<div>
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">Destinos Populares</h2>
						<p className="text-gray-600">Los favoritos de nuestros viajeros</p>
					</div>
					<Button variant="outline">
						Ver Todos
						<ArrowRight className="w-4 h-4 ml-2" />
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{popularDestinations.map((destination) => (
						<Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
							<div className="relative h-40 bg-gray-200 overflow-hidden">
								<img 
									src={destination.image} 
									alt={destination.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<Badge className="absolute top-2 left-2 bg-blue-600 text-xs">
									{destination.highlight}
								</Badge>
								<div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
									<Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
									<span className="text-xs font-medium">{destination.rating}</span>
								</div>
							</div>
							<CardContent className="p-4">
								<h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
								<p className="text-gray-600 text-sm mb-3">
									{destination.reviews} reseñas
								</p>
								<div className="flex items-center justify-between">
									<div className="flex items-center text-gray-600">
										<Calendar className="w-4 h-4 mr-1" />
										<span className="text-sm">{destination.duration}</span>
									</div>
									<div className="text-lg font-bold text-blue-600">
										{destination.price}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Quick Actions */}
			<Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
				<CardContent className="p-6">
					<div className="text-center">
						<Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
						<h3 className="text-xl font-bold text-gray-900 mb-2">
							¿Listo para tu próxima aventura?
						</h3>
						<p className="text-gray-600 mb-6">
							Planifica, reserva y gestiona todos tus viajes desde un solo lugar
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
							<Button className="bg-blue-600 hover:bg-blue-700">
								<Plane className="w-4 h-4 mr-2" />
								Planificar Viaje
							</Button>
							<Button variant="outline">
								Ver Ofertas Especiales
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Home;