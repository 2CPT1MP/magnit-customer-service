import React from 'react';
import WorkerBasicInfo from '../components/worker-details/basic-info.component'
import Header from '../components/header.component'

export const WorkerDetailsPage = ({workerId}) => {
    return (
        <>
            <Header title={"Информация о сотруднике"}/>
            <WorkerBasicInfo />
        </>
    );
}