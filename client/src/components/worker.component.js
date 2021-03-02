import React, { useRef } from 'react';


const WorkerRecord = (props) => {
    const record = useRef();

    const onMouseEnter = (event) => {
        record.current.classList.add("table-active")
    }

    const onMouseLeave = (event) => {
        record.current.classList.remove("table-active")
    }

    const onClick = (event) => {
        window.location.href = `/api/workers/${props.id}`;
    }


    return (
       <tr ref={record} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
           <td>{props.lastName}</td>
           <td>{props.firstName}</td>
           <td>{props.middleName}</td>
           <td>{props.department}</td>
           <td>{props.job}</td>
       </tr>
    );
}

export default WorkerRecord;