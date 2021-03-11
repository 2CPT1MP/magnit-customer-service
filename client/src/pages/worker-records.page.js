import React from 'react';
import WorkersContainer from "../components/worker-records/workers-container.component";
import Header from "../components/header.component";

export const WorkerRecordsPage = () => {
    return (
        <>
            <Header title={"Список сотрудников"} createNew={true}/>
            <WorkersContainer />
            <a href="/workers/create">
                <button className={"btn btn-success mt-4"}>
                    <i className="bi bi-plus-circle" />&nbsp;Добавить&nbsp;работника
                </button>
            </a>
        </>
    );
}