import React from 'react';
import WorkerBasicInfo from './worker-basic-info.component';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useWorker } from "../../hooks/content-provider.hook";
import WorkerSchedule from "./worker-schedule/worker-schedule.component";

const WorkerDetailsContainer = () => {
    const {id} = useParams();
    const [worker, setWorker] = useState();
    const {getWorker, saveWorker} = useWorker(id);

    useEffect(async() => setWorker(await getWorker()), []);

    if (!worker)
        return null;

    const workerModifiedAlert = (
        <div className={"mb-3"}>
            <div className={"alert alert-danger"}>
                <h3><i className="bi bi-exclamation-triangle" /> Информация изменена</h3>
                <p>Информация о сотруднике была <strong>изменена</strong>. Дополнительные <strong>поля недоступны</strong>. Необходимо <strong>принять или отменить</strong> внесенные изменения.</p>
                <button type="reset" className="btn btn-danger me-1"><i className="bi bi-x-circle" /> Отменить</button>
                <button type="submit" className="btn btn-success"><i className="bi bi-check-circle" /> Принять</button>
            </div>
        </div>
    );

    return (
        <>
            <WorkerBasicInfo workerInfo={worker}
                             submitHandler={saveWorker}
                             contentChangedMessage={workerModifiedAlert}/>
            <WorkerSchedule workerId={id} workerSchedule={worker.schedule} />
        </>
    );
}

export default WorkerDetailsContainer;