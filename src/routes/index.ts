import rolePermissionPage from '@/pages/rolePermission';
import { lazy } from 'react';
const RolePage = lazy(() => import('../pages/roles'));
const PermissionPage = lazy(() => import('../pages/permission'))
const UserPage = lazy(() => import('../pages/users'))

const coreRoutes = [
    {
        path: '/roles',
        title: 'roles',
        component:RolePage ,
    },
    {
        path: '/permisos',
        title: 'permisos',
        component:PermissionPage ,
    },
        {
        path: '/roles-permisos',
        title: 'roles-permisos',
        component:rolePermissionPage ,
    },
    {
        path: '/usuarios',
        title: 'usuarios',
        component: UserPage,
    }
]
const routes = [...coreRoutes];
export default routes;
