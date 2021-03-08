import React from 'react';
import {
    useCurrentScheduleDay,
    useEditDayHours,
    useLocked
} from "../../../contexts/current-worker/current-schedule.context";
import {useWorker} from "../../../contexts/current-worker/current-worker.context";
import {useFindJob, useJobs} from "../../../contexts/jobs.context";
import {useState, useEffect} from "react";

const ScheduleDayEditor = () => {
    const [worker] = useWorker();
    const findJobById = useFindJob();
    const day = useCurrentScheduleDay();
    const editDayHours = useEditDayHours();
    const [formHrs, setFormHrs] = useState(0);
    const [locked, setLocked] = useLocked();

    useEffect(() => {
        setFormHrs(day.hours);
    }, [day])

    const editCurrentDayHrs = useEditDayHours();

    if (day.hours === undefined)
        return (
            <div className={"alert alert-info"}>
                <h3><i className="bi bi-info-circle"/> Детализация</h3>
                <p className={"mb-0"}>Выберите <strong>число</strong> месяца для отображения отработанных в этот день часов</p>
            </div>
        );

    const getHourSalary = () => {
        const job = findJobById(worker.job);
        if (job)
            return job.salary;
        return 0;
    }

    const getShiftLength = () => {
        const job = findJobById(worker.job);
        if (job)
            return job.shift;
        return 0;
    }

    const getOvertimeView = () => {
        const shiftLength = getShiftLength();
        const diff = formHrs - shiftLength;
        return (diff > 0)? `${diff} ч (${formHrs} / ${shiftLength} ч)` : `Нет (${formHrs} / ${shiftLength} ч)`;
    }

    const getOvertime = () => {
        const shiftLength = getShiftLength();
        const diff = formHrs - shiftLength;
        return (diff < 0)? 0 : diff;
    }

    const getOverpay = () => {
        const job = findJobById(worker.job);
        if (job)
            return job.overpay;
        return 0;
    }

    const getDailyTotal = () => {
        const overtime = getOvertime();
        const regular = (formHrs - overtime) * getHourSalary();
        const over = (overtime * getOverpay());
        return regular + over;
    }

    const onHoursChange = (event) => {
        setFormHrs(event.target.value);
    }

    const isNotModded = () => {
        if (formHrs == day.hours) {
            setLocked(false);
            return true;
        }
        setLocked(true);
        return false;
    }

    const onReset = (event) => {
        event.preventDefault();
        setFormHrs(day.hours);
        setLocked(!isNotModded())
    }

    const onSubmit = (event) => {
        event.preventDefault();
        editDayHours(formHrs);
        setLocked(!isNotModded())
    }


    return (
        <form className="form" action="" onSubmit={onSubmit} onReset={onReset}>
            <div className="row">
                <div className={"form-group col"}>
                    <label htmlFor="hours" className={"large-width"}><i className="bi bi-clock"/>&nbsp;Отработано&nbsp;(ч)</label>
                    <label htmlFor="hours" className={"small-width"}><i className="bi bi-clock"/>&nbsp;Отраб&nbsp;(ч)</label>
                    <input className={"form-control mt-1"}
                           type="number"
                           step="0.5"
                           name="hours"
                           id="hours"
                           min={0}
                           max={24}
                           value={formHrs}
                           onChange={onHoursChange}
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="over-hours mt-2"><i className="bi bi-arrow-up" />&nbsp;Переработки</label>
                    <input className={"form-control mt-1 readonly"}
                           type="text"
                           name="over-hours"
                           id="over-hours"
                           min={0}
                           max={24}
                           value={getOvertimeView()}
                           disabled
                    />
                </div>
            </div>
            <div className="row">
                <div className={"form-group mt-2 col"}>
                    <label htmlFor="salary"><i className="bi bi-wallet2"/> Зарплата </label>
                    <input className={"form-control mt-1 readonly"}
                           type="text"
                           name="salary"
                           id="salary"
                           value={getHourSalary() + " ₽ / ч"}
                           disabled
                    />
                </div>
                <div className={"form-group mt-2 col"}>
                    <label htmlFor="salary" className={"large-width"}><i className="bi bi-cash-stack"/> Сверхурочные</label>
                    <label htmlFor="salary" className={"small-width"}><i className="bi bi-cash-stack"/> Сверх</label>
                    <input className={"form-control mt-1 readonly"}
                           type="text"
                           name="salary"
                           id="salary"
                           value={getOverpay() + " ₽ / ч"}
                           disabled
                    />
                </div>
            </div>
            <div className={"form-group mt-2 row"}>
                <div className={"form-group mt-2 col"}>
                    <label htmlFor="salary"><i className="bi bi-calendar-day" /> Заработок за день </label>
                    <input className={"form-control mt-1 readonly"}
                           type="text"
                           name="salary"
                           id="salary"
                           value={getDailyTotal() +" ₽"}
                           disabled
                    />
                </div>

            </div>
            <div className={"form-group mt-2 col"} hidden={isNotModded()}>
                <div className={"alert alert-danger"}>
                    <p>Внесены изменения</p>
                    <button className={"btn btn-danger mt-1 me-1"} type={"reset"}>Отменить</button>
                    <button className={"btn btn-success mt-1"} type={"submit"}>Подтвердить</button>
                </div>
            </div>
        </form>
    );
}

export default ScheduleDayEditor;