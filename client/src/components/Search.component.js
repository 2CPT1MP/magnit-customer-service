import React from 'react';
import { useState, useEffect } from 'react';
import { useFilteredWorkers, useWorkersFilter } from "../contexts/workers.context";
import { useDepartments } from "../contexts/departments.context";
import { useJobs } from "../contexts/jobs.context";

const SearchComponent = () => {
    const workersFilter = useWorkersFilter();
    const [workers, workersLoading] = useFilteredWorkers();
    const [filter, setFilter] = useState({});
    const [departments, departmentsLoading] = useDepartments();
    const [jobs, jobsLoading] = useJobs();

    useEffect(() => {
       workersFilter(filter);
    }, [filter]);

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (value === 'any') {
            const otherFields = Object.entries(filter)
                                      .filter((field) => field[0] !== name);
            setFilter(Object.fromEntries(otherFields));
        }
        else
            setFilter({...filter, [event.target.name]: event.target.value});
    }

    const departmentsView = departments.map((department) => <option key={department._id}>{department.name}</option>);
    const jobsView = jobs.map((job) => <option key={job._id}>{job.name}</option>);

    return (
        <div>
            <h2><i className="bi bi-funnel"/> Фильтр </h2>
            <p className={"mb-2"}>С помощью фильтра можно выводить лишь сотрудников определенного отдела, работающих на определенной должности или с определенными ФИО</p>
            <form className={"form"} onSubmit={event => event.preventDefault()} autoComplete={"off"}>
                <div className={"input-group row"}>
                    <div className={"form-group my-1 col-sm"}>
                        <label htmlFor="department">Отдел</label>
                        <select className={"form-control mt-1"} onChange={onChange} name={"department"} disabled={departmentsLoading || workersLoading}>
                            <option value={"any"}>Все отделы</option>
                            {departmentsView}
                        </select>
                    </div>
                    <div className={"form-group my-1 col-sm"}>
                        <label htmlFor="job">Должность</label>
                        <select className={"form-control mt-1"} onChange={onChange} name={"job"} disabled={jobsLoading || workersLoading || departmentsLoading}>
                            <option value={"any"}>Все должности</option>
                            {jobsView}
                        </select>
                    </div>
                    <div className={"form-group my-1 col-lg"}>
                        <label htmlFor="name">ФИО</label>
                        <input type="text"
                               name="name"
                               id="name"
                               className={"form-control mt-1"}
                               onChange={onChange}
                               placeholder={"Поиск по ФИО"}
                               disabled={workersLoading}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchComponent;