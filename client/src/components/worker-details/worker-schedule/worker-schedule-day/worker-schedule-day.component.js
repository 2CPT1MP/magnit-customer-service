import { useState } from 'react';

const WorkerScheduleDay = ({day, hours}) => {
    const [active, setActive] = useState(false);

    const onHover = (event) => {
        event.target.classList.add("table-active");
    }

    const onMouseLeave = (event) => {
        event.target.classList.remove("table-active");
    }
    console.log("render")
    return (
        <td onMouseOver={onHover}
            onMouseLeave={onMouseLeave}
            onClick={() => setActive(true)}
            className={active? "table-current" : ""}>
                {day}
        </td>
    );
};

export default WorkerScheduleDay;