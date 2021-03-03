import React from 'react';
import SearchComponent from "../components/search.component";
import WorkersContainer from "../components/workers.component";
import Header from "../components/header.component";

export const WorkerRecordsPage = () => {
    return (
        <>
            <Header title={"Список сотрудников"}/>
            <SearchComponent />
            <WorkersContainer />
        </>
    );
}