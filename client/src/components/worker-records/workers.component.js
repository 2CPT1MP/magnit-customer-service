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
        return <WorkerRecord firstName={worker.name.first}
                          lastName={worker.name.last}
                          middleName={worker.name.middle}
                          department={worker.department.name}
                          job={worker.job.name}
                          id={worker._id}
                          key={worker._id}
               />;
    });

    if (listEmpty)
        return <div className={"alert alert-info mt-3"}>
                    <i className="bi bi-exclamation-triangle-fill"/> <strong>Сотрудники</strong> с заданными фильтрами <strong>не найдены</strong>
               </div>

    return <div>
            <table className={"table table mt-2"}>
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