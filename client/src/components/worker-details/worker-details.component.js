import React from 'react';
import WorkerBasicInfo from './basic-info.component';
import WorkerSchedule from './schedule/schedule.component';
import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSchedule } from "../../contexts/current-worker/current-schedule.context";
import { useWorker } from "../../contexts/current-worker/current-worker.context";

const WorkerDetails = () => {
    const {request} = useHttp();
    const {id} = useParams();

    const [ready, setReady] = useState(false);
    const [schedule, setSchedule] = useSchedule();
    const [worker, setWorker] = useWorker();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request(`/api/workers/${id}`);
                setWorker(data);
                setReady(true);
            } catch (e) {
                throw Error("Can't fetch current-worker basic info!");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setSchedule(schedule)
    }, [worker]);

    if (!ready)
        return <></>;

    return (
        <>
            <WorkerBasicInfo />
            <WorkerSchedule />
        </>
    );
}

export default WorkerDetails;