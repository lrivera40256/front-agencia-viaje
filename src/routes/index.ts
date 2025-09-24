import { lazy } from 'react';
const RolePage = lazy(() => import('../pages/roles'));
const PermissionPage = lazy(() => import('../pages/permission'))

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
    }
]
const routes = [...coreRoutes];
export default routes;
