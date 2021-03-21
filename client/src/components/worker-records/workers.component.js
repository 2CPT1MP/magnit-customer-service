import React, { useState, useEffect } from 'react';
import WorkerRecord from "./worker-record.component";
import { useFilteredWorkers } from "../../contexts/workers.context";

const WorkersContainer = () => {
    const [workers, workersLoading] = useFilteredWorkers();
    const [listEmpty, setListEmpty] = useState(false);

    useEffect(() => {
        setListEmpty(workers.length === 0);
    }, [workers]);

    if (workersLoading)
        return <></>;

    const workersView = workers.map((worker) => {
        return <WorkerRecord firstName={worker.firstName}
                          lastName={worker.lastName}
                          middleName={worker.middleName}
                          department={worker.department.name}
                          job={worker.job.name}
                          id={worker._id}
                          key={worker._id}
               />;
    });

    if (listEmpty)
        return <div className={"alert alert-info mt-3"}>
                    <h3><i className="bi bi-info-circle"/> Не найдено</h3>
            <p className={"mb-0"}>Сотрудники с заданными фильтрами <strong>не найдены</strong></p>
               </div>

    return <div className={"workers-table mt-4"}>
            <table className={"table table "}>
                <thead>
                    <tr>
                        <th className={"small-width"}>Сотрудник</th>
                        <th className={"large-width"}>Фамилия</th>
                        <th className={"large-width"}>Имя</th>
                        <th className={"large-width"}>Отчество</th>
                        <th className={"large-width"}>Подразделение</th>
                        <th className={"large-width"}>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {workersView}
                </tbody>
            </table>
    </div>;
}

export default WorkersContainer;