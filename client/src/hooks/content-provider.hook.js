import { useEffect, useState } from "react";
import { useHttp } from "./http.hook";

export const useDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const {request} = useHttp();

    const requestDepartments = async () => {
        try {
            const data = await request('/api/departments');
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

    const getWorker = async() => {
        try {
            return await request(`/api/workers/${workerId}`);
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

    return { getWorker, saveWorker };
}

export const useSchedule = (workerId, initialSchedule) => {
    const {request} = useHttp();
    const [schedule, setSchedule] = useState(initialSchedule);

    const removeSchedule = async() => {
        try {
            await request(`/api/workers/${workerId}/schedule`, 'DELETE');
            setSchedule({});
        } catch (e) {
            throw Error("Can't delete schedule!\n" + e.message);
        }
    }

    const setDaysShift = async(day, hours) => {
        try {
            await request(`/api/workers/${workerId}/schedule/${day}`, 'PUT', {hours: hours});
            const newSchedule = schedule.days.map((d) => {
                return ((d.day) === day)? {...d, hours: hours} : d;
            });
            setSchedule({...schedule, days: newSchedule});
        } catch (e) {
            throw Error("Can't fetch worker!\n" + e.message);
        }
    }

    const createSchedule = async(schedule) => {
        try {
            await request(`/api/workers/${workerId}/schedule`, 'PUT', schedule);
            setSchedule(schedule);
        } catch (e) {
            throw Error("Can't create schedule!\n" + e.message);
        }
    }

    return { schedule, setDaysShift, createSchedule, removeSchedule};
}