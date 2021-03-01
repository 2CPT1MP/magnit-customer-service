import React from 'react';
import {useState} from 'react';
import {useWorkers, useWorkersFilter} from "../contexts/workers.context";


const SearchComponent = () => {
    const workers = useWorkers();
    const workersFilter = useWorkersFilter();

    const [department, setDepartment] = useState("");
    const [job, setJob] = useState("");
    const [name, setName] = useState("");

    const onDepartmentChange = (event) => {
        const value = event.target.value;
        setDepartment(value);
        workersFilter('department', value);
    }

    const onJobChange = (event) => {
        const value = event.target.value;
        setJob(value);
        workersFilter('job', value);
    }

    const onNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        workersFilter('name', value);
    }

    return (
        <form className={"form-inline mb-1 mt-4"}>
            <div className={"input-group"}>
                <div className={"form-group col-sm-3"}>
                    <select className={"form-control"} onChange={onDepartmentChange}>
                        <option>Работа с песоналом</option>
                    </select>
                </div>
                <div className={"form-group col-sm-3"}>
                    <select className={"form-control"} onChange={onJobChange}>
                        <option>Консультант</option>
                    </select>
                </div>
                <div className={"form-group col-sm"}>
                <input type="text"
                       name="name"
                       id="name"
                       className={"form-control"}
                       onChange={onNameChange} placeholder={"Поиск по ФИО"}
                />
                </div>
                <button type={"submit"} className={"btn btn-primary"}><i className={"bi-search"}/> </button>
            </div>
        </form>
    );
}

export default SearchComponent;