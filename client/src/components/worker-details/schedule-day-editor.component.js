import React from 'react';
import {useCurrentScheduleDay} from "../../contexts/worker/schedule.context";
import {useState} from "react";

const ScheduleDayEditor = () => {
    const day = useCurrentScheduleDay();


    if (day.hours === undefined)
        return (
            <div className={"alert alert-info"}>
                <i className="bi bi-exclamation-triangle-fill" /> Выберите <strong>число</strong> месяца для отображения отработанных в этот день часов
            </div>
        );

    return (
        <form className="form" action="" onSubmit={event => event.preventDefault()}>
            <div className={"form-group"}>
                <label htmlFor="hours"><i className="bi bi-clock"/> Количество часов</label>
                <input className={"form-control"}
                       type="number"
                       name="hours"
                       id="hours"
                       min={0}
                       max={24}
                       value={day.hours}
                />
            </div>
        </form>
    );
}

export default ScheduleDayEditor;