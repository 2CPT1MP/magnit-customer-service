import React from 'react';
import SearchComponent from "../components/search.component";
import WorkersContainer from "../components/workers.component";

export const WorkerRecordsPage = () => {
    return (
        <>
            <SearchComponent />
            <WorkersContainer />
        </>
    );
}