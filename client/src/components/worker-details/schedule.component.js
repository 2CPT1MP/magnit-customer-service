import React from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useState, useEffect, useMemo, useCallback} from "react";


const WorkerSchedule = ({workerId, schedule}) => {
    const [sche, setSche] = useState(schedule);
    const { request, error } = useHttp();
    const hasSchedule = useMemo(() => (sche !== undefined) && (sche.days !== undefined) && (sche.days.length > 0), [sche]);
    const scheduleView = useMemo(() => {
        const table = [];
        if (hasSchedule) {
            const date = new Date(sche.year, sche.month, 0);

            for (let d = 0; d < sche.days.length;) {
                let row = [];
                while (d < sche.days.length) {
                    row.push(<td>{sche.days[d].day}</td>);
                    if (date.getDay() === 6 || d === sche.days.length - 1) {
                        table.push(<tr>{row}</tr>);
                        row = [];
                    }
                    date.setDate(++d);
                }
            }
        }
        return table;
    }, [sche]);


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

        setSche({
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            days: sch
        });
    }

    useEffect(async() => {
        await request(`/api/workers/${workerId}/schedule`, 'PUT', sche);
    }, [sche]);

    const onScheduleRemove = async() => {
        setSche({});
        //await request(`/api/workers/${workerId}/schedule`, 'DELETE')
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
            <div hidden={!hasSchedule} >
                <div>на {sche.month+1 }/{sche.year}</div>
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
                            {scheduleView}
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