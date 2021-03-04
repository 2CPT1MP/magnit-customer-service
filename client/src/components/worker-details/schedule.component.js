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
            const date = new Date(sche.year, sche.month, 1);
            let row = [];
            for (let i = 1; i !== date.getDay(); i++)
                row.push(<td/>);

            for (let d = 0; d < sche.days.length; date.setDate(++d+1)) {
                row.push(<td>{sche.days[d].day}</td>);
                if (date.getDay() === 0 || d === sche.days.length - 1) {
                    table.push(<tr>{row}</tr>);
                    row = [];
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
    }

    return (
        <div className={"mt-5 mb-5"}>
            <h2><i className="bi bi-clock"/> Отработанные часы</h2>
            <p>Информация о количестве отработанных часах и переработках сотрудника
                в течении текущего месяца <strong>{hasSchedule?  '('+(sche.month+1) + '.' + sche.year+')' : ''}</strong></p>
            <div hidden={hasSchedule}>
                <div className={"alert alert-info mt-3"}>
                    <i className="bi bi-exclamation-triangle-fill" /> По данному работнику <strong>отсутствует информация </strong>
                    об отработанных часах и переработках. Вы можете <strong>добавить</strong> ее нажав на соответствующую кнопку под данным
                    уведомлением.
                </div>
                <button className={"btn btn-primary"} onClick={onScheduleAdd}><i className="bi bi-plus-circle"/> Добавить</button>
            </div>
            <div hidden={!hasSchedule} >
                <div className={"row mt-2"}>
                    <table className={"table table-bordered text-center col-sm"} >
                        <thead>
                            <tr>
                                <th>Пн</th>
                                <th>Вт</th>
                                <th>Ср</th>
                                <th>Чт</th>
                                <th>Пт</th>
                                <th>Сб</th>
                                <th>Вс</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleView}
                        </tbody>
                    </table>
                    <div className={"col-lg"}>
                    </div>
                </div>
                <button className={"btn btn-danger me-1"} onClick={onScheduleRemove}><i className="bi bi-file-earmark-x"/> Удалить</button>
                <button className={"btn btn-success"}><i className="bi bi-credit-card"/> Выплатить</button>
            </div>
        </div>
    );
}

export default WorkerSchedule;