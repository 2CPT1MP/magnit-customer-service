import React from 'react';

const WorkerRecord = (props) => {
    return (
       <tr>
           <td>{props.lastName}</td>
           <td>{props.firstName}</td>
           <td>{props.middleName}</td>
           <td>{props.department}</td>
           <td>{props.job}</td>
       </tr>
    );
}

export default WorkerRecord;