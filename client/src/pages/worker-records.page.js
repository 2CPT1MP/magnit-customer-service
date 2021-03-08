import React from 'react';
import SearchComponent from "../components/search.component";
import WorkersContainer from "../components/worker-records/workers.component";
import Header from "../components/header.component";

export const WorkerRecordsPage = () => {
    return (
        <>
            <Header title={"Список сотрудников"} createNew={true}/>
            <SearchComponent />
            <WorkersContainer />
            <a href="/workers/create">
                <button className={"btn btn-success"}>
                    <i className="bi bi-plus-circle" />&nbsp;Добавить&nbsp;работника
                </button>
            </a>
        </>
    );
}