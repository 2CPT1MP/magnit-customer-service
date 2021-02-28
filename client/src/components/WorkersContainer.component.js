import React from 'react';
import {useState, useContext} from "react";
import WorkerRecord from "./WorkerRecord.component";
import {WorkerContext} from "../contexts/Workers.context";

const WorkersContainer = (props) => {
    const workers = useContext(WorkerContext);
    const workersView = workers.map((worker) => {
        return <WorkerRecord firstName={worker.name.first}
                             lastName={worker.name.last}
                             department={worker.department}
                             job={worker.job}/>
    });

    return (
        <table className={"table"}>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Подразделение</th>
                    <th>Должность</th>
                </tr>
            </thead>
            <tbody>
                {workersView}
            </tbody>
        </table>
    );
}

export default WorkersContainer;