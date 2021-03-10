import React, { useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";
import WorkersFilter from "./workers-filter.component";
import WorkersTable from "./workers-table.component";

const WorkersContainer = () => {
    const [workers, setWorkers] = useState([]);
    const [filteredWorkers, setFilteredWorkers] = useState([]);
    const {request} = useHttp();

    useEffect(() => {
        const requestWorkers = async () => {
            try {
                const data = await request('/api/workers');
                setWorkers(data);
            } catch (e) {
                throw Error("Can't fetch workers!\n" + e.message);
            }
        }
        requestWorkers();
    }, []);

    useEffect(() => setFilteredWorkers(workers), [workers])

    return (
        <>
            <WorkersFilter workers={workers} setFilteredWorkers={setFilteredWorkers} />
            <WorkersTable filteredWorkers={filteredWorkers} />
        </>
    );
}

export default WorkersContainer;