import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth.service';

const PrivateRoute = ({ children }) => {
    const user = getCurrentUser();
    
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;