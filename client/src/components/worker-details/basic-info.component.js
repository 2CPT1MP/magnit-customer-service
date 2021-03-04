import React from 'react';
import { useState, useEffect } from "react";
import {useDepartments} from "../../contexts/departments.context";
import {useJobs} from "../../contexts/jobs.context";

const WorkerBasicInfo = ({basicInfo, workerId}) => {
    console.log(basicInfo);
    const [lastName, setLastName] = useState(basicInfo.name.last);
    const [firstName, setFirstName] = useState(basicInfo.name.first);
    const [middleName, setMiddleName] = useState(basicInfo.name.middle);

    const [address, setAddress] = useState(basicInfo.address);
    const [phone, setPhone] = useState(basicInfo.phone);

    const [department, setDepartment] = useState(basicInfo.department);
    const [job, setJob] = useState(basicInfo.job);

    const departments = useDepartments();
    const jobs = useJobs();

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
                            value={department}>
                        {departmentsView}
                    </select>
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="job">Должность</label>
                    <select className={"form-control mt-1"}
                            name={"job"}
                            id={"job"}
                            value={job}>
                        {jobsView}
                    </select>
                </div>
            </div>
        </form>
    );
}

export default WorkerBasicInfo;