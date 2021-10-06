import { Navigate } from 'react-router-dom';

const RouteProtect = ({ children }) => {
    return (
        localStorage.getItem('tokenize') ? children : <Navigate to="/login" />
    )
}

export default RouteProtect;
