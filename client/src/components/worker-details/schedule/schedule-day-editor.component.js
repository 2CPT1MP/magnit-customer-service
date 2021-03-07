import React from 'react';
import {useCurrentScheduleDay} from "../../../contexts/current-worker/current-schedule.context";
import {useWorker} from "../../../contexts/current-worker/current-worker.context";
import {useFindJob, useJobs} from "../../../contexts/jobs.context";

const ScheduleDayEditor = () => {
    const [worker] = useWorker();
    const findJobById = useFindJob();
    const day = useCurrentScheduleDay();

    if (day.hours === undefined)
        return (
            <div className={"alert alert-info"}>
                <i className="bi bi-exclamation-triangle-fill" /> Выберите <strong>число</strong> месяца для отображения отработанных в этот день часов
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
        const diff = day.hours - shiftLength;
        return (diff > 0)? `${diff} ч (${day.hours} / ${shiftLength} ч)` : `Нет (${day.hours} / ${shiftLength} ч)`;
    }

    const getOvertime = () => {
        const shiftLength = getShiftLength();
        const diff = day.hours - shiftLength;
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
        const regular = (day.hours - overtime) * getHourSalary();
        const over = (overtime * getOverpay());
        return regular + over;
    }

    return (
        <form className="form" action="" onSubmit={event => event.preventDefault()}>
            <div className="row">
                <div className={"form-group col"}>
                    <label htmlFor="hours" className={"large-width"}><i className="bi bi-clock"/>&nbsp;Отработано&nbsp;(ч)</label>
                    <label htmlFor="hours" className={"small-width"}><i className="bi bi-clock"/>&nbsp;Отраб&nbsp;(ч)</label>
                    <input className={"form-control mt-1"}
                           type="number"
                           name="hours"
                           id="hours"
                           min={0}
                           max={24}
                           value={day.hours}
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
            <div className={"form-group mt-2"}>
                <label htmlFor="salary"><i className="bi bi-calendar-day" /> Заработок за день </label>
                <input className={"form-control mt-1 readonly"}
                       type="text"
                       name="salary"
                       id="salary"
                       value={getDailyTotal() +" ₽"}
                       disabled
                />
            </div>
        </form>
    );
}

export default ScheduleDayEditor;