import React from 'react';
import Header from '../components/header.component'
import { CurrentWorkerProvider } from "../contexts/current-worker/current-worker.context";

export const CreateWorkerPage = () => {

    return (
        <CurrentWorkerProvider>
            <Header title={"Регистрация сотрудника"}/>

        </CurrentWorkerProvider>
    );
}