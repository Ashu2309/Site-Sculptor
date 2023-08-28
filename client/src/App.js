import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import UserState from './components/context/UserState';
import Login from './components/Login.jsx';

import Create from './components/portfolio/Create.jsx';
import Portfolio from './components/portfolio/Portfolio.jsx';

/** auth middleware */
import { AuthorizeUser } from './components/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path: '/',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/create',
        element: <Create />
    },
    {
        path: '/portfolio/:user',
        element: <Portfolio />
    }
])

export default function App() {
    return (
        <main>
            <UserState>
                <RouterProvider router={router}></RouterProvider>
            </UserState>
        </main>
    )
}
