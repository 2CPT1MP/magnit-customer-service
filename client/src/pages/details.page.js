import React from 'react';
import WorkerBasicInfo from '../components/worker-details/basic-info.component'
import Header from '../components/header.component'
import WorkerSchedule from "../components/worker-details/schedule.component";

export const WorkerDetailsPage = () => {
    return (
        <>
            <Header title={"Информация о сотруднике"}/>
            <WorkerBasicInfo />
            <WorkerSchedule />
        </>
    );
}