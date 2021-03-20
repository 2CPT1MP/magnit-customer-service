import React, {useContext} from 'react';
import WorkerBasicInfo from './basic-info.component';
import WorkerSchedule from './schedule/schedule.component';
import WorkerTransactionsComponent from "./worker-transactions.component";
import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSchedule } from "../../contexts/current-worker/current-schedule.context";
import { useWorker } from "../../contexts/current-worker/current-worker.context";
import AuthContext from "../../contexts/auth.context";

const WorkerDetails = () => {
    const {request} = useHttp();
    const {id} = useParams();

    const [ready, setReady] = useState(false);
    const [schedule, setSchedule] = useSchedule();
    const [worker, setWorker] = useWorker();
    const {token} = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request(`/api/workers/${id}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                });
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
            <WorkerTransactionsComponent />
        </>
    );
}

export default WorkerDetails;