import SecurityPage from '@/pages/security';
import { lazy } from 'react';
const HomePage = lazy(() => import('../pages/Home'));
const RolePage = lazy(() => import('../features/roles/pages/RolePage'));
const PermissionPage = lazy(() => import('../pages/permission'));
const UserPage = lazy(() => import('@/features/users/pages/UserPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/profilePage'));
const tablePermissionPage = lazy(()=> import('../pages/tablePermission'))
const tripFormPage = lazy(() => import('../features/trip-form/pages/CreateTripWizard'));
const journeyPage = lazy(() => import('../features/trip-journeys/pages/SegmentPage'));

const coreRoutes = [
	{
		path: '/tablaPermiso/:id?',
		title: 'tablaPermiso',
		component: tablePermissionPage,
	},
	{
		path: 'trayectos',
		title: 'trayectos',
		component: journeyPage,
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
