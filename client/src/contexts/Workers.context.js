import {createContext, useContext, useState, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";

const WorkerContext = createContext();
export const WorkerFilterContext = createContext();

export const useWorkers= () => {
    return useContext(WorkerContext);
}

export const useWorkersFilter= () => {
    return useContext(WorkerFilterContext);
}

export const WorkerProvider = ( {children} ) => {
    const {loading, error, request} = useHttp();
    const [workers, setWorkers] = useState([]);

    useEffect(async() => {
        try {
            const data = await request('/api/workers');
            setWorkers(data);
        } catch (e) {
            throw Error("Can't fetch workers!");
        }
    }, []);

    const filterWorkers = (targetField, value) => {
        switch (targetField) {
            case undefined:
                return workers;
            case 'name':
                return filterWorkersByName(value)
            default:
                return workers.filter((worker) => worker[targetField] === value);
        }
    }

    const filterWorkersByName = (targetName) => {
        return workers.filter((worker) => {
            const name = worker.name;
            const fullName = name.first + " " +name.last +" " +name.middle;
            return (fullName.indexOf(targetName) !== -1);
        });
    }

    return (
        <WorkerContext.Provider value={workers}>
        <WorkerFilterContext.Provider value={filterWorkers}>
            <div hidden={!loading}>
            </div>
            <div hidden={loading}>
                {children}
            </div>
        </WorkerFilterContext.Provider>
        </WorkerContext.Provider>
    );
}