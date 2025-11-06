import SecurityPage from '@/pages/security';
import { lazy } from 'react';
const HomePage = lazy(() => import('../pages/Home'));
const RolePage = lazy(() => import('../features/roles/pages/RolePage'));
const PermissionPage = lazy(() => import('../pages/permission'));
const UserPage = lazy(() => import('@/features/users/pages/UserPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/profilePage'));
const tablePermissionPage = lazy(()=> import('../pages/tablePermission'))

const coreRoutes = [
	{
		path: '/tablaPermiso/:id?',
		title: 'tablaPermiso',
		component: tablePermissionPage,
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
