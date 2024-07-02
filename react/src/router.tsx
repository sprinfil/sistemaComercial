import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Auth/Login';
import DefaultLayout from './views/Layout/DefaultLayout';
import GuestLayout from './views/Layout/GuestLayout';
import NotFound from './views/Layout/NotFound';
import DashBoard from './views/Layout/DashBoard';
import Catalogos from './views/Configuraciones/Catalogos/Catalogos';
import Contratacion from './views/Contratos/Contratacion';
import Poligonos from './views/PoligonosGeograficos/Poligonos';
import { Proximamente } from './views/Layout/Proximamente';
import  DetalleUsuario  from './views/Usuarios/Consultar/DetalleUsuario';

const router = createBrowserRouter ([
    {
        path:'/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path:'/dashboard',
                element: <DashBoard/>
            },
            {
                path:'/catalogos',
                element: <Catalogos/>
            },
            {
                path:'/contratos',
                element: <Contratacion/>
            },
            {

                path:'/poligonos',
                element: <Poligonos/>
            },
            {
                path:'/proximamente',
                element: <Proximamente/>
            },
            {
                path:'/usuario',
                element: <DetalleUsuario/>
            },
        ]
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            },
        ]
    },

    {
        path:'*',
        element: <NotFound/>
    },
])
export default router;
