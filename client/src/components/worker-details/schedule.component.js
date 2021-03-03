import React from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useLocation} from "react-router";

const WorkerSchedule = ({schedule}) => {
    const hasSchedule = (schedule !== undefined) && (schedule.days.length > 0);
    const workerId = useLocation().pathname;
    const {request} = useHttp();

    const onScheduleAdd = async() => {
        let iterationDate = new Date();
        const currentDate = new Date();
        iterationDate.setDate(1);

        let sch = [];
        for (let i = 1; iterationDate.getMonth() === currentDate.getMonth(); iterationDate.setDate(i++)) {
            sch.push({
                hours: (iterationDate.getDate() < currentDate.getDate())? 8 : 0
            });
        }

        const schObj = {
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            days: sch
        }
        await request(`/api${workerId}/schedule`, 'PUT', schObj)
    }


    return (
        <div className={"mt-5"}>
            <h2><i className="bi bi-clock"/> Отработанные часы</h2>
            <div hidden={hasSchedule}>
                <div className={"alert alert-info mt-3"}>
                    <i className="bi bi-exclamation-triangle-fill" /> По данному работнику <strong>нет информации</strong> об отработанных часах и переработках
                </div>
                <button className={"btn btn-primary"} onClick={onScheduleAdd}>Добавить</button>
            </div>
            <div hidden={!hasSchedule}>
                <button className={"btn btn-danger"}>Удалить</button>
                <button className={"btn btn-success"}>Оплатить</button>

            </div>
        </div>
    );
}

export default WorkerSchedule;