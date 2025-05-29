import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth.service';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const authenticated = isAuthenticated();
    
    if (!authenticated) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;