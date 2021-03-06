import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const JobContext = createContext([]);

export const useJobs = () => {
    return useContext(JobContext);
}

export const JobProvider = ( {children} ) => {
    const {request, loading, error} = useHttp();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async() => {
            try {
                setJobs(await request('/api/jobs'));
            } catch (e) {
                throw Error("Can't fetch departments!");
            }
        }
        fetchJobs();
    }, []);

    return (
        <JobContext.Provider value={[jobs, loading, error]}>
            {children}
        </JobContext.Provider>
    );
}