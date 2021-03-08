import { createContext, useContext, useState, useEffect } from 'react';
import {useHttp} from "../../hooks/http.hook";

const CurrentWorkerContext = createContext();
const SaveWorkerContext = createContext();
const CreateWorkerContext = createContext();
const LockedWorkerContext = createContext();

export const useWorker = () => {
    return useContext(CurrentWorkerContext);
}

export const useSaveWorker = () => {
    return useContext(SaveWorkerContext);
}

export const useCreateWorker = () => {
    return useContext(CreateWorkerContext);
}

export const useLockedWorker = () => {
    return useContext(LockedWorkerContext);
}

export const CurrentWorkerProvider = ( {children} ) => {
    const {request} = useHttp();
    const [worker, setWorker] = useState({
        firstName: "", middleName: "", lastName: "",
        department: "", job: "", schedule: []
    });
    const [locked, setLocked] = useState(false);

    const saveWorker = async (updatedWorker) => {
        const sWorker = {...updatedWorker};
        delete sWorker.schedule;
        delete sWorker._id;

        await request(`/api/workers/${worker._id}`, 'PUT', sWorker);
    }

    const createWorker = async (worker) => {
        console.log(worker);
        await request(`/api/workers`, 'POST', worker);
    }

    return (
        <CurrentWorkerContext.Provider value={[worker, setWorker]}>
            <SaveWorkerContext.Provider value={saveWorker}>
                <CreateWorkerContext.Provider value={createWorker}>
                    <LockedWorkerContext.Provider value={[locked, setLocked]}>
                        {children}
                    </LockedWorkerContext.Provider>
                </CreateWorkerContext.Provider>
            </SaveWorkerContext.Provider>
        </CurrentWorkerContext.Provider>
    );
}