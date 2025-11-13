import SecurityPage from '@/pages/security';
import { lazy } from 'react';
const HomePage = lazy(() => import('../pages/Home'));
const RolePage = lazy(() => import('../features/roles/pages/RolePage'));
const PermissionPage = lazy(() => import('../pages/permission'));
const UserPage = lazy(() => import('@/features/users/pages/UserPage'));
const TouristActivityPage = lazy(
	() => import('@/features/tourist-activities/pages/TouristActivityPage')
);
const ProfilePage = lazy(() => import('@/features/profile/pages/profilePage'));
const tablePermissionPage = lazy(() => import('../pages/tablePermission'));
const tripFormPage = lazy(() => import('../features/trip-form/pages/CreateTripWizard'));
const journeyPage = lazy(() => import('../features/trip-journeys/pages/SegmentPage'));
const CustomerPage = lazy(() => import('../features/user/pages/customerPage'));
const BankCardPage = lazy(() => import('@/features/bank-cards/pages/BankCardPage'));
const travelPage = lazy(() => import('../features/travels/pages/TravelPage'));
const quotaPage = lazy(() => import('../features/quotas/pages/QuotaPage'));
const journeysPage = lazy(() => import('../features/journeys/pages/JourneyPage'));
const roomPage = lazy(() => import('../features/rooms/pages/RoomPage'));
const vehiclePage = lazy(() => import('../features/vehicle-management/pages/VehiclePage'));
const ServiceTransportationPage = lazy(
	() => import('../features/transportation/pages/ServiceTransportationPage')
);
const transportItineraryPage = lazy(
	() => import('../features/transport-itinerary/pages/TransportItineraryPage')
);
const ServiceTransportationPage = lazy(
	() => import('../features/transportation/pages/ServiceTransportationPage')
);

const coreRoutes = [
	{
		path: 'servicio-transporte',
		title: 'tablaServicios',
		component: ServiceTransportationPage,
	},
	{
		path: '/clientes',
		title: 'tablaClientes',
		component: CustomerPage,
	},
	{
		path: '/tablaPermiso/:id?',
		title: 'tablaPermiso',
		component: tablePermissionPage,
	},
	{
		path: 'trayecto',
		title: 'trayectos',
		component: journeyPage,
	},
	{
		path: '/viajes',
		title: 'viajes',
		component: travelPage,
	},
	{
		path: '/cuotas',
		title: 'cuotas',
		component: quotaPage,
	},
	{
		path: '/trayectos',
		title: 'trayectos',
		component: journeysPage,
	},
	{
		path: '/habitaciones',
		title: 'habitaciones',
		component: roomPage,
	},
	{
		path: '/vehiculos',
		title: 'vehiculos',
		component: vehiclePage,
	},
	{
		path: '/itinerarios-transporte',
		title: 'itinerarios de transporte',
		component: transportItineraryPage,
	},
	{
		path: '/form',
		title: 'formulario de viaje',
		component: tripFormPage,
	},
	{
		path: '/',
		title: 'Inicio',
		component: HomePage,
	},
	{
		path: '/roles/:id?',
		title: 'roles',
		component: RolePage,
	},
	{
		path: '/permisos/:id?',
		title: 'permisos',
		component: PermissionPage,
	},
	{
		path: '/permisos',
		title: 'permisos',
		component: PermissionPage,
	},

	{
		path: '/usuarios',
		title: 'usuarios',
		component: UserPage,
	},
	{
		path: '/tarjetas/:customerId?',
		title: 'tarjetas',
		component: BankCardPage,
	},
	{
		path: '/tarjetas',
		title: 'tarjetas',
		component: BankCardPage,
	},
	{
		path: '/actividades',
		title: 'actividades',
		component: TouristActivityPage,
	},
	{
		path: '/seguridad',
		title: 'Seguridad',
		component: SecurityPage,
	},
	{
		path: '/perfil',
		title: 'Perfil',
		component: ProfilePage,
	},
];
const routes = [...coreRoutes];
export default routes;
