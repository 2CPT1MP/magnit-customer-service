import { useState, useMemo } from "react";
import {useSchedule} from "../../../hooks/content-provider.hook";
import WorkerScheduleDay from "./worker-schedule-day/worker-schedule-day.component";


const WorkerSchedule = ({workerId, workerSchedule}) => {
    const {schedule, setDaysShift, createSchedule, removeSchedule} = useSchedule(workerId, workerSchedule);
    const hasSchedule = useMemo(() => schedule && schedule.days && schedule.days.length > 0, [schedule]);

    const scheduleView = useMemo(() => {
        const table = [];
        if (hasSchedule) {
            const date = new Date(schedule.year, schedule.month, 1);
            let row = [];
            for (let i = 1; i !== date.getDay(); i++)
                row.push(<td/>);

            for (let d = 0; d < schedule.days.length; date.setDate(++d+1)) {
                row.push(<WorkerScheduleDay key={schedule.days[d].day} day={schedule.days[d].day} hours={schedule.days[d].hours}/>);
                if (date.getDay() === 0 || d === schedule.days.length - 1) {
                    table.push(<tr>{row}</tr>);
                    row = [];
                }
            }
        }
        return table;
    }, [schedule]);

    const onScheduleAdd = async() => {
        let iterationDate = new Date();
        const currentDate = new Date();
        iterationDate.setDate(1);

        let sch = [];
        for (let i = 1; iterationDate.getMonth() === currentDate.getMonth(); iterationDate.setDate(++i))
            sch.push({ hours: (iterationDate.getDate() < currentDate.getDate())? 8 : 0, day: i});
        await createSchedule({month: currentDate.getMonth(), year: currentDate.getFullYear(), days: sch});
    }

    const getMonth = (num) => {
        const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                        "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
        return months[num];
    }

    if (!hasSchedule) {
        return (
            <div className={"mt-5 mb-5"}>
                <h2><i className="bi bi-calendar-date" /> Информация об отработанных часах</h2>
                <p>Информация о количестве отработанных часов и переработках сотрудника
                    в течении текущего месяца</p>
                <div>
                    <div className={"alert alert-info mt-3"}>
                        <h3><i className="bi bi-info-circle"/> Нет расписания</h3>
                        <p className={"mb-0"}>По данному работнику <strong>отсутствует информация </strong>
                            об отработанных часах и переработках. Вы можете <strong>добавить</strong> ее нажав на соответствующую кнопку под данным
                            уведомлением.
                        </p>
                    </div>
                    <button className={"btn btn-primary"} onClick={onScheduleAdd}><i className="bi bi-plus-circle"/> Добавить</button>
                </div>
            </div>
        );
    }
/*
    const calculateTotal = () => {
        if (worker.job) {
            const job = findJobId(worker.job);
            if (job) {
                const {salary, overpay, shift} = job;
                return schedule.days.reduce((total, d) => {
                    const overtime = (d.hours - shift < 0)? 0 : d.hours - shift;
                    return total + overtime * overpay + d.hours * salary;
                }, 0);
            }
        }
        return 0;
    }
*/
    return (
        <div className={`mt-5 mb-5`}>
            <h2><i className="bi bi-calendar-date" /> Информация об отработанных часах</h2>
            <p>Информация о количестве отработанных часов и переработках сотрудника
               в течении текущего месяца
            </p>
            <div>
                <div className={"row mt-2 mx-auto"}>
                    <table className={"table table-bordered text-center col-sm me-5"} >
                        <caption> {getMonth(schedule.month)} 2021</caption>
                        <thead className={"table-dark"}>
                        <tr>
                            <th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th>
                        </tr>
                        </thead>
                        <tbody>
                            {scheduleView}
                        </tbody>
                    </table>
                    <div className={"col mb-2"}>

                    </div>
                </div>
                <div>
                    <button className={"btn btn-danger my-1 me-1"} onClick={() => {removeSchedule()}}><i className="bi bi-trash"/> Аннулировать</button>
                    <button className={"btn btn-success"} ><i className="bi bi-credit-card"/> Выплатить </button>
                </div>
            </div>
        </div>
    );
}

export default WorkerSchedule;