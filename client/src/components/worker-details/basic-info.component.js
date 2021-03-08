import React from 'react';
import { useState } from "react";
import { useDepartments } from "../../contexts/departments.context";
import { useJobs } from "../../contexts/jobs.context";
import {useLockedWorker, useSaveWorker, useWorker} from "../../contexts/current-worker/current-worker.context";

const WorkerBasicInfo = () => {
    const [worker, setWorker] = useWorker();
    const saveWorker = useSaveWorker();
    const [departments, departmentsLoading] = useDepartments();
    const [jobs, jobsLoading] = useJobs();
    const [locked, setLocked] = useLockedWorker();

    const departmentsView = departments.map((department) => <option value={department._id}>{department.name}</option>);
    const jobsView = jobs.map((job) => <option value={job._id}>{job.name}</option>);

    const [formData, setFormData] = useState(worker);
    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        saveWorker(formData);
        setWorker(formData);
    }

    const onReset = (event) => {
        event.preventDefault();
        setFormData(worker);
    }

    const isNotModded = () => {
        if (JSON.stringify(worker) === JSON.stringify(formData)) {
            setLocked(false);
            return true;
        }
        setLocked(true);
        return false;
    }

    return (
        <form onSubmit={onSubmit} onReset={onReset} autoComplete={"off"}>
            <div className={"mt-5"}>
                <div className={"mb-3"} hidden={isNotModded()}>
                    <div className={"alert alert-danger"}>
                        <h3><i className="bi bi-exclamation-triangle" /> Информация изменена</h3>
                        <p>Информация о сотруднике была <strong>изменена</strong>. Дополнительные <strong>поля недоступны</strong>. Необходимо <strong>принять или отменить</strong> внесенные изменения.</p>
                    <button type="reset" className="btn btn-danger me-1"><i className="bi bi-x-circle" /> Отменить</button>
                    <button type="submit" className="btn btn-success"><i className="bi bi-check-circle" /> Принять</button>
                    </div>
                </div>
                <h2><i className="bi bi-info-circle"/> Базовая информация</h2>
                <p>Основная паспортная информация о сотруднике</p>
                <div className={"form-group mt-2"}>
                    <label htmlFor="lastName">Фамилия</label>
                    <input className="form-control mt-1"
                           type="text"
                           name="lastName"
                           id="lastName"
                           value={formData.lastName}
                           onChange={onChange}
                    />
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="lastName">Имя</label>
                    <input className="form-control mt-1"
                           type="text"
                           name="firstName"
                           id="firstName"
                           value={formData.firstName}
                           onChange={onChange}
                    />
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="middleName">Отчество</label>
                    <input className="form-control mt-1"
                           type="text"
                           name="middleName"
                           id="middleName"
                           value={formData.middleName}
                           onChange={onChange}
                    />
                </div>
            </div>
            <div className={"mt-5"}>
                <h2><i className="bi bi-person-lines-fill"/> Контактная информация</h2>
                <p>Информация о месте жительства и номере телефона для обратной связи с сотрудником организации</p>
                    <div className={"form-group mt-2"}>
                        <label htmlFor="address"><i className="bi bi-house-door"/> Адрес</label>
                        <input className="form-control mt-1"
                               type="address"
                               name="address"
                               id="address"
                               value={formData.address}
                               onChange={onChange}
                        />
                    </div>
                    <div className={"form-group mt-2"}>
                        <label htmlFor="phone"><i className="bi bi-telephone"/> Телефон</label>
                        <input className="form-control mt-1"
                               type="phone"
                               name="phone"
                               id="phone"
                               value={formData.phone}
                               onChange={onChange}
                        />
                    </div>
            </div>
            <div className={"mt-5"}>
                <h2><i className="bi bi-building"/> Должностная информация</h2>
                <p>Информация об отделе, в котором сотрудник работает и должности работника</p>
                <div className={"form-group mt-2"}>
                    <label htmlFor="department">Отдел</label>
                    <select className={"form-control mt-1"}
                            name={"department"}
                            id={"department"}
                            value={formData.department}
                            onChange={onChange}
                            disabled={departmentsLoading}>
                        {departmentsView}
                    </select>
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="job">Должность</label>
                    <select className={"form-control mt-1"}
                            name={"job"}
                            id={"job"}
                            value={formData.job}
                            onChange={onChange}
                           disabled={jobsLoading}>
                        {jobsView}
                    </select>
                </div>
            </div>
            <div className={"mb-3"} hidden={isNotModded()}>
                <div className={"alert alert-danger mt-3"}>
                    <h3><i className="bi bi-exclamation-triangle" /> Информация изменена</h3>
                    <p>Информация о сотруднике была <strong>изменена</strong>. Дополнительные <strong>поля недоступны</strong>. Необходимо <strong>принять или отменить</strong> внесенные изменения.</p>
                    <button type="reset" className="btn btn-danger me-1"><i className="bi bi-x-circle" /> Отменить</button>
                    <button type="submit" className="btn btn-success"><i className="bi bi-check-circle" /> Принять</button>
                </div>
            </div>
        </form>
    );
}

export default WorkerBasicInfo;