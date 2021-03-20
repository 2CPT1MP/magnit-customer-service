import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";
import AuthContext from "./auth.context";

const DepartmentContext = createContext([]);

export const useDepartments = () => {
    return useContext(DepartmentContext);
}

export const DepartmentProvider = ( {children} ) => {
    const {request, loading, error} = useHttp();
    const [departments, setDepartments] = useState([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        const fetchDepartments = async() => {
            try {
                setDepartments(await request('/api/departments', 'GET', null, {
                    Authorization: `Bearer ${token}`
                }));
            } catch (e) {
                throw Error("Can't fetch departments!");
            }
        }
        fetchDepartments();
    }, []);

    return (
        <DepartmentContext.Provider value={[departments, loading, error]}>
            {children}
        </DepartmentContext.Provider>
    );
}