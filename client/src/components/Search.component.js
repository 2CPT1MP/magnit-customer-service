import React from 'react';
import { useState, useEffect } from 'react';
import { useWorkersFilter } from "../contexts/workers.context";
import { useDepartments } from "../contexts/departments.context";
import { useJobs } from "../contexts/jobs.context";

const SearchComponent = () => {
    const workersFilter = useWorkersFilter();
    const [filter, setFilter] = useState({});
    const departments = useDepartments();
    const jobs = useJobs();

    useEffect(() => {
       workersFilter(filter);
    }, [filter]);

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (value === 'any') {
            const otherFields = Object.entries(filter).filter((field) => field[0] !== name);
            setFilter(Object.fromEntries(otherFields));
        }
        else
            setFilter({...filter, [event.target.name]: event.target.value});
    }

    const departmentsView = departments.map((department) => <option key={department._id}>{department.name}</option>);
    const jobsView = jobs.map((job) => <option key={job._id}>{job.name}</option>);

    return (
        <form className={"form-inline mb-1 mt-4"} onSubmit={event => event.preventDefault()}>
            <div className={"input-group"}>
                <div className={"form-group col-sm-3"}>
                    <select className={"form-control"} onChange={onChange} name={"department"}>
                        <option value={"any"}>Все отделы</option>
                        {departmentsView}
                    </select>
                </div>
                <div className={"form-group col-sm-3"}>
                    <select className={"form-control"} onChange={onChange} name={"job"}>
                        <option value={"any"}>Все должности</option>
                        {jobsView}
                    </select>
                </div>
                <div className={"form-group col-sm"}>
                <input type="text"
                       name="name"
                       id="name"
                       className={"form-control"}
                       onChange={onChange} placeholder={"Поиск по ФИО"}
                />
                </div>
                <button type={"submit"} className={"btn btn-primary"}><i className={"bi-search"}/> </button>
            </div>
        </form>
    );
}

export default SearchComponent;