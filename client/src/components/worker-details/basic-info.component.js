import React from 'react';
import { useState, useEffect } from "react";
import {useHttp} from "../../hooks/http.hook";
import {useLocation} from "react-router";

const WorkerBasicInfo = () => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");

    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [department, setDepartment] = useState("");
    const [job, setJob] = useState("");

    const {request} = useHttp();
    const workerId = useLocation().pathname;

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request(`/api${workerId}`);
                setFirstName(data.name.first);
                setLastName(data.name.last);
                setMiddleName(data.name.middle);

                setAddress(data.address);
                setPhone(data.phone);

                setDepartment(data.department);
                setJob(data.job);
            } catch (e) {
                throw Error("Can't fetch worker basic info!");
            }
        }
        fetchData();
    }, []);




    return (
        <form onSubmit={event => event.preventDefault()} autoComplete={"off"}>
            <div className={"mt-5"}>
                <h2>Базовая информация</h2>
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
                <h2>Контактная информация</h2>
                    <div className={"form-group mt-2"}>
                        <label htmlFor="address">Адрес</label>
                        <input className="form-control mt-1"
                               type="address"
                               name="address"
                               id="address"
                               value={address}
                        />
                    </div>
                    <div className={"form-group mt-2"}>
                        <label htmlFor="phone">Телефон</label>
                        <input className="form-control mt-1"
                               type="phone"
                               name="phone"
                               id="phone"
                               value={phone}
                        />
                    </div>
            </div>
            <div className={"mt-5"}>
                <h2>Работа</h2>
                <div className={"form-group mt-2"}>
                    <label htmlFor="department">Отдел</label>
                    <select className={"form-control mt-1"}
                            name={"department"}
                            id={"department"}
                            value={department}>
                        <option>Департамент 1</option>
                    </select>
                </div>
                <div className={"form-group mt-2"}>
                    <label htmlFor="job">Должность</label>
                    <select className={"form-control mt-1"}
                            name={"job"}
                            id={"job"}
                            value={job}>
                        <option>Должность 1</option>
                    </select>
                </div>
            </div>
        </form>
    );
}

export default WorkerBasicInfo;