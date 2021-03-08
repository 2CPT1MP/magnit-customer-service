import { createContext, useContext, useState, useEffect } from 'react';
import {useHttp} from "../../hooks/http.hook";

const CurrentWorkerContext = createContext();
const SaveWorkerContext = createContext();

export const useWorker = () => {
    return useContext(CurrentWorkerContext);
}

export const useSaveWorker = () => {
    return useContext(SaveWorkerContext);
}

export const CurrentWorkerProvider = ( {children} ) => {
    const {request} = useHttp();
    const [worker, setWorker] = useState({
        name: {first: "", middle: "", last: ""},
        department: "", job: "", schedule: []
    });

    const saveWorker = async (updatedWorker) => {
        const sWorker = {...updatedWorker};
        delete sWorker.schedule;
        delete sWorker._id;

        await request(`/api/workers/${worker._id}`, 'PUT', sWorker);
    }

    return (
        <CurrentWorkerContext.Provider value={[worker, setWorker]}>
            <SaveWorkerContext.Provider value={saveWorker}>
                {children}
            </SaveWorkerContext.Provider>
        </CurrentWorkerContext.Provider>
    );
}