import SecurityPage from '@/pages/security';
import { lazy } from 'react';
const RolePage = lazy(() => import('../pages/roles'));
const PermissionPage = lazy(() => import('../pages/permission'));
const rolePermissionPage = lazy(() => import('../pages/rolePermission'));
const UserPage = lazy(() => import('../pages/users'));
const UserRolePage = lazy(() => import('../pages/userRole'));
const ProfilePage = lazy(() => import('../pages/profile'));
const tablePermissionPage = lazy(()=> import('../pages/tablePermission'))

const coreRoutes = [
	{
		path: '/tablaPermiso',
		title: 'tablaPermiso',
		component: tablePermissionPage,
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
		path: '/roles-permisos',
		title: 'roles-permisos',
		component: rolePermissionPage,
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
		path: '/usuarios-roles',
		title: 'usuarios-roles',
		component: UserRolePage,
	},
	{
		path: '/perfil',
		title: 'Perfil',
		component: ProfilePage,
	},
];
const routes = [...coreRoutes];
export default routes;
