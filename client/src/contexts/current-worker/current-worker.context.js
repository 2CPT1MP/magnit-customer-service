import { createContext, useContext, useState, useEffect } from 'react';
import {useHttp} from "../../hooks/http.hook";
import AuthContext from "../auth.context";

const CurrentWorkerContext = createContext();
const SaveWorkerContext = createContext();
const CreateWorkerContext = createContext();
const LockedWorkerContext = createContext();
const AddPayoutContext = createContext();

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

export const useAddPayout = () => {
    return useContext(AddPayoutContext);
}

export const CurrentWorkerProvider = ( {children} ) => {
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const [worker, setWorker] = useState({
        firstName: "", middleName: "", lastName: "",
        department: "", job: "", schedule: []
    });
    const [locked, setLocked] = useState(false);

    const saveWorker = async (updatedWorker) => {
        const sWorker = {...updatedWorker};
        delete sWorker.schedule;
        delete sWorker._id;

        await request(`/api/workers/${worker._id}`, 'PUT', sWorker, {
            Authorization: `Bearer ${token}`
        });
    }

    const createWorker = async (worker) => {
        await request(`/api/workers`, 'POST', worker, {
            Authorization: `Bearer ${token}`
        });
    }

    const addPayout = async (transaction) => {
        console.log(transaction);
        await request(`/api/workers/${worker._id}/transactions`, 'POST', transaction, {
            Authorization: `Bearer ${token}`
        });
        console.log(transaction);
        setWorker({...worker, transactions: [transaction, ...worker.transactions]})
        console.log(worker);
    }

    return (
        <CurrentWorkerContext.Provider value={[worker, setWorker]}>
            <SaveWorkerContext.Provider value={saveWorker}>
                <CreateWorkerContext.Provider value={createWorker}>
                    <AddPayoutContext.Provider value={addPayout}>
                        <LockedWorkerContext.Provider value={[locked, setLocked]}>
                            {children}
                        </LockedWorkerContext.Provider>
                    </AddPayoutContext.Provider>
                </CreateWorkerContext.Provider>
            </SaveWorkerContext.Provider>
        </CurrentWorkerContext.Provider>
    );
}