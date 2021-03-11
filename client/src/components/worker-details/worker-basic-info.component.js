import React, { useState } from 'react';
import useForm from "../../hooks/form.hook";
import { useHttp } from '../../hooks/http.hook';
import { useDepartments, useJobs } from "../../hooks/content-provider.hook";


const WorkerBasicInfo = ({workerInfo, submitHandler}) => {
    const {request} = useHttp();
    const [formData, setFormData] = useState(workerInfo);
    const {onChange, onReset, isModified, onSubmit} = useForm(workerInfo, setFormData);

    const departments = useDepartments();
    const jobs = useJobs();

    // ARE PROVIDED BY PROPS!!!!!
    const createWorker = async (worker) => {
        await request(`/api/workers`, 'POST', worker);
    }
    const modifiedMessage = (
        <div className={"mb-3"}>
            <div className={"alert alert-danger"}>
                <h3><i className="bi bi-exclamation-triangle" /> Информация изменена</h3>
                <p>Информация о сотруднике была <strong>изменена</strong>. Дополнительные <strong>поля недоступны</strong>. Необходимо <strong>принять или отменить</strong> внесенные изменения.</p>
                <button type="reset" className="btn btn-danger me-1"><i className="bi bi-x-circle" /> Отменить</button>
                <button type="submit" className="btn btn-success"><i className="bi bi-check-circle" /> Принять</button>
            </div>
        </div>
    );
    // ARE PROVIDED BY PROPS!!!!!

    return (
        <form onSubmit={(e) => onSubmit(e, submitHandler)} onReset={onReset} autoComplete={"off"}>
            <div className={"mt-5"}>
                {isModified() && modifiedMessage}
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
                           required
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
                           required
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
                           required
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
                           required
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
                           required
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
                            onChange={onChange}>
                        {departments.map((department) => <option value={department._id}>{department.name}</option>)}
                    </select>
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="job">Должность</label>
                    <select className={"form-control mt-1"}
                            name={"job"}
                            id={"job"}
                            value={formData.job}
                            onChange={onChange}>
                        {jobs.map((job) => <option value={job._id}>{job.name}</option>)}
                    </select>
                </div>
            </div>
            {isModified() && modifiedMessage}
        </form>
    );
}

export default WorkerBasicInfo;