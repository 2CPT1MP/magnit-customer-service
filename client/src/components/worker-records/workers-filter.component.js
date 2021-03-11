import { useState, useEffect } from 'react';
import { useDepartments, useJobs } from "../../hooks/content-provider.hook";

const WorkersFilter = ({workers, setFilteredWorkers}) => {
    const [filter, setFilter] = useState({});
    const departments = useDepartments();
    const jobs = useJobs();
    useEffect(() => filterWorkers(filter), [filter]);

    const filterWorkers = (filter) => {
        const filtered = workers.filter((worker) => {
            let fieldsMatched = 0;
            for (let field in filter) {
                if (field === 'name') {
                    const fullName = `${worker.lastName} ${worker.firstName} ${worker.middleName}`.toLowerCase();
                    if (fullName.indexOf(filter['name'].toLowerCase()) !== -1)
                        fieldsMatched++;
                } else if (field === 'department' || field === 'job'){
                    if (worker.hasOwnProperty(field) && worker[field]['name'] === filter[field])
                        fieldsMatched++;
                }
            }
            return Object.keys(filter).length === fieldsMatched;
        });
        setFilteredWorkers(filtered);
    }

    const onChange = (event) => {
        if (event.target.value === 'any') {
            const otherFields = Object.entries(filter)
                                      .filter((field) => field[0] !== event.target.name);
            const newFilter = Object.fromEntries(otherFields);
            setFilter(newFilter)
        }
        else {
            setFilter({...filter, [event.target.name]: event.target.value});
        }
    }

    return (
        <div>
            <h2><i className="bi bi-funnel"/> Фильтр </h2>
            <p className={"mb-2"}>
                С помощью фильтра можно выводить лишь сотрудников определенного отдела,
                работающих на определенной должности или с определенными ФИО
            </p>
            <form className={"form"} onSubmit={event => event.preventDefault()} autoComplete={"off"}>
                <div className={"input-group row"}>
                    <div className={"form-group my-1 col-sm"}>
                        <label htmlFor="department">Отдел</label>
                        <select className={"form-control mt-1"} onChange={onChange} name={"department"}>
                            <option value={"any"}>Все отделы</option>
                            {departments.map((department) => <option key={department._id}>{department.name}</option>)}
                        </select>
                    </div>
                    <div className={"form-group my-1 col-sm"}>
                        <label htmlFor="job">Должность</label>
                        <select className={"form-control mt-1"} onChange={onChange} name={"job"}>
                            <option value={"any"}>Все должности</option>
                            {jobs.map((job) => <option key={job._id}>{job.name}</option>)}
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
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default WorkersFilter;