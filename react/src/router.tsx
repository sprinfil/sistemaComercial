import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Auth/Login';
import DefaultLayout from './views/Layout/DefaultLayout';
import GuestLayout from './views/Layout/GuestLayout';
import NotFound from './views/Layout/NotFound';
import DashBoard from './views/Layout/DashBoard';

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