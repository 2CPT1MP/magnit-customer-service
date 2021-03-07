import React, { useRef } from 'react';

const WorkerRecord = (props) => {
    const record = useRef();

    const onMouseEnter = () => {
        record.current.classList.add("table-active")
    }

    const onMouseLeave = () => {
        record.current.classList.remove("table-active")
    }

    const onClick = () => {
        window.location.href = `/workers/${props.id}`;
    }

    return (
       <tr ref={record}
           onMouseEnter={onMouseEnter}
           onMouseLeave={onMouseLeave}
           onClick={onClick}
       >
           <td className={"small-width"}><strong>{props.lastName} {props.firstName} {props.middleName}</strong>
               <br/>{props.job}<br/><em>{props.department}</em>
           </td>
           <td className={"large-width"}>{props.lastName}</td>
           <td className={"large-width"}>{props.firstName}</td>
           <td className={"large-width"}>{props.middleName}</td>
           <td className={"large-width"}>{props.department}</td>
           <td className={"large-width"}>{props.job}</td>
       </tr>
    );
}

export default WorkerRecord;