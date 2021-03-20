import {useState, useEffect, useCallback} from 'react';

const authData = 'authData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(authData, JSON.stringify({userId: id, token: jwtToken}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(authData);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(authData));
        if (data && data.token)
            login(data.token, data.userId);
        setLoading(false);
    }, [login]);

    return { login, logout, token, userId, loading};
}