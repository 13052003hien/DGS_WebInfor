import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import About from '../pages/About';
import ProjectDetail from '../pages/ProjectDetail';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectManagement from '../components/projects/ProjectManagement';
import LocationManagement from '../components/locations/LocationManagement';
import ContactManagement from '../components/contacts/ContactManagement';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import SalaryManagement from '../components/salary/SalaryManagement';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: 'admin',
                element: (
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: 'users',
                        element: <UserManagement />
                    },
                    {
                        path: 'projects',
                        element: <ProjectManagement />
                    },
                    {
                        path: 'locations',
                        element: <LocationManagement />
                    },
                    {
                        path: 'contacts',
                        element: <ContactManagement />
                    },
                    {
                        path: 'salaries',
                        element: <SalaryManagement />
                    },
                    {
                        path: 'settings',
                        element: <Settings />
                    }
                ]
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'projects',
                element: <ProjectsPage />,
            },
            {
                path: 'projects/:id',
                element: <ProjectDetail />,
            },
        ],
    },
]);

export default router;