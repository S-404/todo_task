import React from 'react';
import { dlinefromfloat, checkDLine } from '../utils/utils.js';

const TaskList = ({ taskList, user }) => {
  const doneByYou = (user, complitedBy) => (complitedBy == user ? 'byyou' : '');

  return (
    <div className="task_list_container">
      <table className="task_list_table">
        <thead>
          <tr className="task_list_header">
            <th className="narrow">DLine</th>
            <th>Task</th>
            <th className="narrow">Status</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr
              className={
                'task_list_datarow ' +
                checkDLine(task.DEADLINE, task.PERIODICITY, task.STATUS)
              }
              key={task.ID}
            >
              <td className="narrow">
                {dlinefromfloat(task.DEADLINE, task.PERIODICITY)}
              </td>
              <td>{task.TASK_NAME}</td>
              <td
                className={'narrow statuscol ' + doneByYou(user, task.USERID)}
              >
                {task.STATUS}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
