import React, { useState, useEffect } from 'react';
import WorkerRecord from "./worker.component";
import { useFilteredWorkers } from "../contexts/workers.context";

const WorkersContainer = () => {
    const workers = useFilteredWorkers();
    const [listEmpty, setListEmpty] = useState(false);

    useEffect(() => {
        setListEmpty(workers.length === 0);
        console.log(workers.length === 0)
    }, [workers])

    const workersView = workers.map((worker) => {
        return (
            <WorkerRecord firstName={worker.name.first}
                          lastName={worker.name.last}
                          middleName={worker.name.middle}
                          department={worker.department.name}
                          job={worker.job.name}
                          id={worker._id}
                          key={worker._id}
            />
        );
    });

    return (
        <>
            <div className={"alert alert-danger mt-3"} hidden={!listEmpty}>
                <strong>Сотрудники</strong> с заданными фильтрами <strong>не найдены</strong>
            </div>
            <table className={"table mt-2"} hidden={listEmpty}>
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Подразделение</th>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {workersView}
                </tbody>
            </table>
        </>
    );
}

export default WorkersContainer;