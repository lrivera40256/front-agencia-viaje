import { lazy } from 'react';
const TestPrueba = lazy(() => import('../pages/demo'))

const coreRoutes = [

    {
        path: '/test',
        title: 'test',
        component:TestPrueba ,
    }
]
const routes = [...coreRoutes];
export default routes;
