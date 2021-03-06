import React from 'react';
import { useState } from "react";
import { useDepartments } from "../../contexts/departments.context";
import { useJobs } from "../../contexts/jobs.context";
import { useWorker } from "../../contexts/worker/worker.context";

const WorkerBasicInfo = () => {
    const [worker, setWorker] = useWorker();

    const [lastName, setLastName] = useState(worker.name.last);
    const [firstName, setFirstName] = useState(worker.name.first);
    const [middleName, setMiddleName] = useState(worker.name.middle);

    const [address, setAddress] = useState(worker.address);
    const [phone, setPhone] = useState(worker.phone);

    const [department, setDepartment] = useState(worker.department);
    const [job, setJob] = useState(worker.job);

    const [departments, departmentsLoading] = useDepartments();
    const [jobs, jobsLoading] = useJobs();

    const departmentsView = departments.map((department) => <option value={department._id}>{department.name}</option>);
    const jobsView = jobs.map((job) => <option value={job._id}>{job.name}</option>);

    return (
        <form onSubmit={event => event.preventDefault()} autoComplete={"off"}>
            <div className={"mt-5"}>
                <h2><i className="bi bi-info-circle"/> Базовая информация</h2>
                <p>Основная паспортная информация о сотруднике</p>
                <div className={"form-group mt-2"}>
                    <label htmlFor="lastName">Фамилия</label>
                    <input className="form-control mt-1"
                           type="text"
                           name="lastName"
                           id="lastName"
                           value={lastName}
                    />
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="lastName">Имя</label>
                    <input className="form-control mt-1"
                           type="text"
                           name="firstName"
                           id="firstName"
                           value={firstName}
                    />
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="middleName">Отчество</label>
                    <input className="form-control mt-1"
                           type="text"
                           name="middleName"
                           id="middleName"
                           value={middleName}
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
                               value={address}
                        />
                    </div>
                    <div className={"form-group mt-2"}>
                        <label htmlFor="phone"><i className="bi bi-telephone"/> Телефон</label>
                        <input className="form-control mt-1"
                               type="phone"
                               name="phone"
                               id="phone"
                               value={phone}
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
                            value={department}
                            hidden={departmentsLoading}>
                        {departmentsView}
                    </select>
                    <select className={"form-control mt-1"}
                            hidden={!departmentsLoading}
                            disabled>
                        <option>Загрузка отделов...</option>
                    </select>
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="job">Должность</label>
                    <select className={"form-control mt-1"}
                            name={"job"}
                            id={"job"}
                            value={job}
                            hidden={jobsLoading}>
                        {jobsView}
                    </select>
                    <select className={"form-control mt-1"}
                            hidden={!jobsLoading}
                            disabled>
                    <option>Загрузка должностей...</option>
                    </select>
                </div>
            </div>
        </form>
    );
}

export default WorkerBasicInfo;