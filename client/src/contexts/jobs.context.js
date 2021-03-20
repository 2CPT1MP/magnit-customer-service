import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";
import AuthContext from "./auth.context";

const JobContext = createContext([]);
const FindJobContext = createContext([]);

export const useJobs = () => {
    return useContext(JobContext);
}

export const useFindJob = () => {
    return useContext(FindJobContext);
}

export const JobProvider = ( {children} ) => {
    const {request, loading, error} = useHttp();
    const [jobs, setJobs] = useState([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        const fetchJobs = async() => {
            try {
                setJobs(await request('/api/jobs', 'GET', null, {
                    Authorization: `Bearer ${token}`
                }));
            } catch (e) {
                throw Error("Can't fetch departments!");
            }
        }
        fetchJobs();
    }, []);

    const findJobById = (id) => {
        return jobs.find((job) => job._id === id);
    }

    return (
        <JobContext.Provider value={[jobs, loading, error]}>
            <FindJobContext.Provider value={findJobById}>
                {children}
            </FindJobContext.Provider>
        </JobContext.Provider>
    );
}