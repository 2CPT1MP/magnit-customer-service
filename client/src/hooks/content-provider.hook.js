import {useEffect, useState} from "react";
import {useHttp} from "./http.hook";

export const useDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const {request} = useHttp();

    const requestDepartments = async () => {
        try {
            const data = await request('/api/workers');
            setDepartments(data);
        } catch (e) {
            throw Error("Can't fetch departments!\n" + e.message);
        }
    }

    useEffect(() => requestDepartments(), []);
    return departments;
}

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const {request} = useHttp();

    const requestJobs = async () => {
        try {
            const data = await request('/api/jobs');
            setJobs(data);
        } catch (e) {
            throw Error("Can't fetch jobs!\n" + e.message);
        }
    }

    useEffect(() => requestJobs(), []);
    return jobs;
}

export const useWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const {request} = useHttp();

    const requestWorkers= async () => {
        try {
            const data = await request('/api/workers');
            setWorkers(data);
        } catch (e) {
            throw Error("Can't fetch workers!\n" + e.message);
        }
    }

    useEffect(() => requestWorkers(), []);
    return workers;
}

export const useWorker = (workerId) => {
    const {request} = useHttp();
    const [inProgress, setInProgress] = useState(true);

    const getWorker = async() => {
        try {
            const data = await request(`/api/workers/${workerId}`);
            setInProgress(false);
            return data;
        } catch (e) {
            throw Error("Can't fetch worker!\n" + e.message);
        }
    }

    const saveWorker = async(basicInfo) => {
        try {
            await request(`/api/workers/${workerId}`, 'PUT', basicInfo);
        } catch (e) {
            throw Error("Can't fetch worker!\n" + e.message);
        }
    }

    return { getWorker, saveWorker, inProgress };
}