import React from 'react';
import WorkerBasicInfo from './basic-info.component';
import WorkerSchedule from './schedule.component';
import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSchedule } from "../../contexts/worker/schedule.context";
import { useWorker } from "../../contexts/worker/worker.context";

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
                throw Error("Can't fetch worker basic info!");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setSchedule(schedule)
    }, [worker]);

    if (!ready)
        return (
            <div className={"alert alert-info loading container"}><i className="bi bi-arrow-repeat" /> Загрузка информации
            </div>);

    return (
        <>
            <div className={"alert alert-info finished container"}><i className="bi bi-arrow-repeat" /> Загрузка информации
            </div>
            <div className={"loading-subject"}>
                <WorkerBasicInfo />
                <WorkerSchedule />
            </div>
        </>
    );
}

export default WorkerDetails;