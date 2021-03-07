import React from 'react';
import {useCurrentScheduleDay} from "../../contexts/worker/schedule.context";
import {useWorker} from "../../contexts/worker/worker.context";
import {useFindJob, useJobs} from "../../contexts/jobs.context";

const ScheduleDayEditor = () => {
    const [worker] = useWorker();
    const findJobById = useFindJob();

    const day = useCurrentScheduleDay();

    if (day.hours === undefined)
        return (
            <div className={"container"}>
                <div className={"alert alert-info"}>
                    <i className="bi bi-exclamation-triangle-fill" /> Выберите <strong>число</strong> месяца для отображения отработанных в этот день часов
                </div>
            </div>
        );

    const getHourSalary = () => {
        const job = findJobById(worker.job);
        if (job)
            return job.salary;
        return 0;
    }

    return (
        <div className={"container"}>
        <form className="form" action="" onSubmit={event => event.preventDefault()}>
            <div className={"form-group"}>
                <label htmlFor="hours"><i className="bi bi-clock"/> Отработано (часов) </label>
                <input className={"form-control mt-1"}
                       type="number"
                       name="hours"
                       id="hours"
                       min={0}
                       max={24}
                       value={day.hours}
                />
            </div>
            <div className={"form-group mt-2"}>
                <label htmlFor="salary"><i className="bi bi-wallet2"/> Почасовая оплата</label>
                <input className={"form-control mt-1"}
                       type="text"
                       name="salary"
                       id="salary"
                       value={getHourSalary() + " ₽"}
                       disabled
                />
            </div>
            <div className={"form-group mt-2"}>
                <label htmlFor="salary"><i className="bi bi-calendar-day" /> Заработок за день </label>
                <input className={"form-control mt-1"}
                       type="text"
                       name="salary"
                       id="salary"
                       value={getHourSalary() * day.hours + " ₽"}
                       disabled
                />
            </div>

        </form>
        </div>
    );
}

export default ScheduleDayEditor;