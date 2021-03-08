import React from 'react';
import WorkerDetails from '../components/worker-details/worker-details.component'
import Header from '../components/header.component'
import { CurrentWorkerProvider } from "../contexts/current-worker/current-worker.context";
import WorkerBasicInfo from "../components/worker-details/basic-info.component";

export const CreateWorkerPage = () => {
    return (
        <CurrentWorkerProvider>
            <Header title={"Регистрация сотрудника"}/>
            <WorkerBasicInfo create={true}/>
        </CurrentWorkerProvider>
    );
}