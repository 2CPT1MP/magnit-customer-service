import React, { useState, useEffect } from 'react';
import WorkersFilter from "./workers-filter.component";
import WorkersTable from "./worker-records-table/workers-table.component";
import { useWorkers } from "../../hooks/content-provider.hook";

const WorkersContainer = () => {
    const workers = useWorkers();
    const [filteredWorkers, setFilteredWorkers] = useState([]);
    useEffect(() => setFilteredWorkers(workers), [workers])

    return (
        <>
            <WorkersFilter workers={workers} setFilteredWorkers={setFilteredWorkers} />
            <WorkersTable filteredWorkers={filteredWorkers} />
        </>
    );
}

export default WorkersContainer;