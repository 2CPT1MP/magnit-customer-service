import React from 'react';

const WorkerRecord = (props) => {
    return (
       <tr>
           <td>{props.firstName}</td>
           <td>{props.lastName}</td>
           <td>{props.department}</td>
           <td>{props.job}</td>
       </tr>
    );
}

export default WorkerRecord;