import React, { useState, useMemo } from 'react';
import {useCurrentScheduleDay, useSelectScheduleDay} from "../../contexts/worker/schedule.context";

const ScheduleDay = ({day}) => {
    const selectCurrentScheduleDay = useSelectScheduleDay();
    const currentScheduleDay = useCurrentScheduleDay();
    const activated = useMemo(() => currentScheduleDay.day === day, [currentScheduleDay]);

    const onHover = (event) => {
       event.target.classList.add("table-active");
    }

    const onMouseLeave = (event) => {
        event.target.classList.remove("table-active");
    }

    const onSelect = (event) => {
        selectCurrentScheduleDay(day);
    }
    return (
        <td onMouseOver={onHover}
            onMouseLeave={onMouseLeave}
            onClick={onSelect}
            className={(activated)? "table-primary ":""}>
            {day}
        </td>
    );
};

export default ScheduleDay;