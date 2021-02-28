import {createContext, useState, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";

export const WorkerContext = createContext();

export const WorkerProvider = ( {children} ) => {
    const {loading, error, request} = useHttp();
    const [workers, setWorkers] = useState([]);

    useEffect(fetchWorkers, []);

    async function fetchWorkers() {
        try {
            const data = await request('/api/workers');
            setWorkers(data);
        } catch (e) {
            throw Error("Can't fetch workers!");
        }
    }


    return (
        <WorkerContext.Provider value={workers}>
            {children}
        </WorkerContext.Provider>
    );
}