import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const JobContext = createContext([]);

export const useJobs = () => {
    return useContext(JobContext);
}

export const JobProvider = ( {children} ) => {
    const {request} = useHttp();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request('/api/jobs');
                setJobs(data);
            } catch (e) {
                throw Error("Can't fetch departments!");
            }
        }
        fetchData();
    }, []);

    return (
        <JobContext.Provider value={jobs}>
            {children}
        </JobContext.Provider>
    );
}