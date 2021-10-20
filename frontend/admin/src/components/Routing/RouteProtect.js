import { useCallback, useEffect, useState, memo } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "src/api/AuthService";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const RouteProtect = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const token = AuthService.getToken();
    try {
      if (token) {
        let tokenExpiration = jwtDecode(token).exp;
        let dateNow = new Date();

        if (tokenExpiration * 1000 < dateNow.getTime()) {
          AuthService.setIsAuthenticated(false);
          AuthService.deleteToken();
          AuthService.deleteAuthenticatedUser();
          forceUpdate();
        } else {
          AuthService.setIsAuthenticated(true);
          forceUpdate();
        }
      } else {
        AuthService.setIsAuthenticated(false);
        AuthService.deleteToken();
        AuthService.deleteAuthenticatedUser();
        forceUpdate();
      }
    } catch (err) {
      AuthService.setIsAuthenticated(false);
      AuthService.deleteToken();
      AuthService.deleteAuthenticatedUser();
      forceUpdate();
    }
  }, [authenticated]);
  return AuthService.getIsAuthenticated() ? children : <Navigate to="/login" />;
};

export default memo(RouteProtect);
