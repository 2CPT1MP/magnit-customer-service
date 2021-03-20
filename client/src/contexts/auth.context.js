import { createContext } from 'react';

const AuthContext = createContext({
    token: null,
    userId: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});

export default AuthContext;