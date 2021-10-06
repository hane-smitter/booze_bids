import { Navigate } from 'react-router-dom';

const RoutePublic = ({ children }) => {
    return (
        localStorage.getItem('tokenize') ?  <Navigate to="/app/dashboard" /> : children
    );
}

export default RoutePublic;
