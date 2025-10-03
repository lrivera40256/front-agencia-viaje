import SecurityPage from '@/pages/security';
import { lazy } from 'react';
const RolePage = lazy(() => import('../pages/roles'));
const PermissionPage = lazy(() => import('../pages/permission'));
const rolePermissionPage = lazy(() => import('../pages/rolePermission'));
const UserPage = lazy(() => import('../pages/users'));
const UserRolePage = lazy(() => import('../pages/userRole'));

const coreRoutes = [
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
];
const routes = [...coreRoutes];
export default routes;
