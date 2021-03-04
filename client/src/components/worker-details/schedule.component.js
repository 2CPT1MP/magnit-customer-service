import React from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useState} from "react";

const WorkerSchedule = ({workerId, schedule}) => {
    let hasSchedule = (schedule !== undefined) && (schedule.days !== undefined) && (schedule.days.length > 0);

    const { request } = useHttp();

    const onScheduleAdd = async() => {
        let iterationDate = new Date();
        const currentDate = new Date();
        iterationDate.setDate(1);


        let sch = [];
        for (let i = 1; iterationDate.getMonth() === currentDate.getMonth(); iterationDate.setDate(++i)) {
            console.log(iterationDate.getMonth(), currentDate.getMonth())
            sch.push({
                hours: (iterationDate.getDate() < currentDate.getDate())? 8 : 0,
                day: i
            });
        }

        const schObj = {
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            days: sch
        }
        await request(`/api/workers/${workerId}/schedule`, 'PUT', schObj)
    }

    const onScheduleRemove = async() => {
        await request(`/api/workers/${workerId}/schedule`, 'DELETE')
    }

    const table = [];

    if (hasSchedule) {
        const date = new Date(schedule.year, schedule.month, 0);

        for (let d = 0; d < schedule.days.length;) {
            let row = [];
            while (d < schedule.days.length) {
                row.push(<td>{schedule.days[d].day}</td>);
                if (date.getDay() === 6 || d === schedule.days.length - 1) {
                    table.push(<tr>{row}</tr>);
                    row = [];
                }
                date.setDate(++d);
            }
        }
    }

    console.log(table);

    return (
        <div className={"mt-5"}>
            <h2><i className="bi bi-clock"/> Отработанные часы</h2>
            <div hidden={hasSchedule}>
                <div className={"alert alert-info mt-3"}>
                    <i className="bi bi-exclamation-triangle-fill" /> По данному работнику <strong>нет информации</strong> об отработанных часах и переработках
                </div>
                <button className={"btn btn-primary"} onClick={onScheduleAdd}>Добавить</button>
            </div>
            <div hidden={!hasSchedule} >
                <div>на {schedule.month+1 }/{schedule.year}</div>
                <div className={"row"}>
                    <table className={"table col-sm"} >
                        <thead>
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                    <div className={"col-lg"}>
                    </div>
                </div>
                <button className={"btn btn-danger"} onClick={onScheduleRemove}>Удалить</button>
                <button className={"btn btn-success"}>Оплатить</button>
            </div>
        </div>
    );
}

export default WorkerSchedule;