import React from 'react';
import WorkerBasicInfo from './worker-basic-info.component';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useWorker } from "../../hooks/content-provider.hook";

const WorkerDetailsContainer = () => {
    const {id} = useParams();
    const [worker, setWorker] = useState();
    const {getWorker, saveWorker, inProgress} = useWorker(id);

    useEffect(() => {
        const fetchData = async() => {
            const workerData = await getWorker();
            setWorker(workerData)
        }
        fetchData();
    }, []);

    if (!worker)
        return null;
    return <WorkerBasicInfo workerInfo={worker} submitHandler={saveWorker} />
}

export default WorkerDetailsContainer;