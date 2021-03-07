import React from 'react';
import WorkerDetails from '../components/worker-details/worker-details.component'
import Header from '../components/header.component'
import { ScheduleProvider } from "../contexts/current-worker/current-schedule.context";
import { CurrentWorkerProvider } from "../contexts/current-worker/current-worker.context";

export const WorkerDetailsPage = () => {
    return (
        <CurrentWorkerProvider>
            <Header title={"Информация о сотруднике"}/>
                <ScheduleProvider>
                    <WorkerDetails />
                </ScheduleProvider>
        </CurrentWorkerProvider>
    );
}