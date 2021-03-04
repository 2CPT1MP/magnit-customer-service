import React from 'react';
import WorkerBasicInfo from './basic-info.component';
import WorkerSchedule from './schedule.component';
import {useHttp} from "../../hooks/http.hook";
import {useState, useEffect} from "react";
import {useParams} from "react-router";

const WorkerDetails = () => {
    const {request} = useHttp();
    const {id} = useParams();
    const [workerData, setWorkerData] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request(`/api/workers/${id}`);
                setWorkerData(data);
                setReady(true);
            } catch (e) {
                throw Error("Can't fetch worker basic info!");
            }
        }
        fetchData();
    }, []);

    if (!ready)
        return <div>Loading...</div>;

    return (
        <>
            <div>
                <WorkerBasicInfo workerId={workerData._id} basicInfo={workerData} />
                <WorkerSchedule workerId={workerData._id} schedule={workerData.schedule} />
            </div>
        </>
    );
}

export default WorkerDetails;