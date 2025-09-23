import { lazy } from 'react';
const RolePage = lazy(() => import('../pages/roles'));

const coreRoutes = [

    {
        path: '/test',
        title: 'test',
        component:RolePage ,
    }
]
const routes = [...coreRoutes];
export default routes;
