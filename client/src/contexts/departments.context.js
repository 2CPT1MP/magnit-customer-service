import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const DepartmentContext = createContext([]);

export const useDepartments = () => {
    return useContext(DepartmentContext);
}

export const DepartmentProvider = ( {children} ) => {
    const {request, loading} = useHttp();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request('/api/departments');
                setDepartments(data);
            } catch (e) {
                throw Error("Can't fetch departments!");
            }
        }
        fetchData();
    }, []);

    return (
        <DepartmentContext.Provider value={[departments, loading]}>
            {children}
        </DepartmentContext.Provider>
    );
}