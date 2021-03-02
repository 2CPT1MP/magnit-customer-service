import React from 'react';
import { useState, useEffect } from 'react';
import { useWorkersFilter } from "../contexts/workers.context";


const SearchComponent = () => {
    const workersFilter = useWorkersFilter();
    const [filter, setFilter] = useState({});

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

    return (
        <form className={"form-inline mb-1 mt-4"}>
            <div className={"input-group"}>
                <div className={"form-group col-sm-3"}>
                    <select className={"form-control"} onChange={onChange} name={"department"}>
                        <option value={"any"}>Все отделы</option>
                        <option>Отдел продаж</option>
                        <option>Отдел по работе с персоналом</option>
                    </select>
                </div>
                <div className={"form-group col-sm-3"}>
                    <select className={"form-control"} onChange={onChange} name={"job"}>
                        <option value={"any"}>Все должности</option>
                        <option>Начальник отдела продаж</option>
                        <option>Старший менеджер</option>
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