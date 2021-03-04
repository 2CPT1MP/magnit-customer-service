import React from 'react';
import WorkerDetails from '../components/worker-details/worker-details.component'
import Header from '../components/header.component'

export const WorkerDetailsPage = () => {
    return (
        <>
            <Header title={"Информация о сотруднике"}/>
            <WorkerDetails />
        </>
    );
}