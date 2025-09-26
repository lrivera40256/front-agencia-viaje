import { lazy } from 'react';
const RolePage = lazy(() => import('../pages/roles'));
const PermissionPage = lazy(() => import('../pages/permission'))
const rolePermissionPage = lazy(() => import('../pages/rolePermission'))

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
    }
]
const routes = [...coreRoutes];
export default routes;
