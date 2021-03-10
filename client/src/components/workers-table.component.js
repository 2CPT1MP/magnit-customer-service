import React from 'react';
import WorkerTableRecord from "./worker-table-record.component";

const WorkersTable = ({filteredWorkers}) => {
    if (!filteredWorkers || filteredWorkers.length === 0)
        return (
            <div className={"alert alert-info mt-3"}>
                <h3><i className="bi bi-info-circle"/> Не найдено</h3>
                <p className={"mb-0"}>Сотрудники с заданными фильтрами <strong>не найдены</strong></p>
            </div>
        );

    return (
        <table className={"table table mt-4"}>
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
                {filteredWorkers.map((worker) => (
                    <WorkerTableRecord firstName={worker.firstName}
                                  lastName={worker.lastName}
                                  middleName={worker.middleName}
                                  department={worker.department.name}
                                  job={worker.job.name}
                                  id={worker._id}
                                  key={worker._id}/>
                ))}
            </tbody>
        </table>
    );
}

export default WorkersTable;