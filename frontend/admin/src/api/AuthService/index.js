const AuthService = {
    getToken() {
        return localStorage.getItem("tokenize");
    },
    setToken(token) {
        localStorage.setItem("tokenize", token);
    },
    deleteToken() {
        localStorage.removeItem("tokenize");
    },
    getIsAuthenticated() {
        return JSON.parse(localStorage.getItem('isAuthenticated'));
    },
    setIsAuthenticated(value) {
        localStorage.setItem('isAuthenticated', value);
    },
    deleteIsAuthenticated() {
        localStorage.removeItem('isAuthenticated');
    }
}

export {AuthService};