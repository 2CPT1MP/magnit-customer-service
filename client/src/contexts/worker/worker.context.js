import { createContext, useContext, useState, useEffect } from 'react';

const CurrentWorkerContext = createContext({});

export const useWorker = () => {
    return useContext(CurrentWorkerContext);
}

export const CurrentWorkerProvider = ( {children} ) => {
    const [worker, setWorker] = useState({
        name: {first: "", middle: "", last: ""},
        department: "", job: "", schedule: []
    });

    return (
        <CurrentWorkerContext.Provider value={[worker, setWorker]}>
            {children}
        </CurrentWorkerContext.Provider>
    );
}