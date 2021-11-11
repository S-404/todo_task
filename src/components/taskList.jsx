import React from 'react';
import { dlinefromfloat, checkDLine, getStatus } from '../utils/utils.js';

const TaskList = ({ taskList, user }) => {
  const doneByUser = (user, complitedBy) =>
    complitedBy === user ? '_bold' : '';

  return (
    <div className="task-list-container">
      <table className="task-list-table">
        <thead className="task-list-table__thead">
          <tr className="task-list-table__tr">
            <th className="task-list-table__th task-list-table__th_narrow">
              DLine
            </th>
            <th className="task-list-table__th">Task</th>
            <th className="task-list-table__th task-list-table__th_narrow">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="task-list-table__tbody">
          {taskList.map((task) => {
            let status = getStatus(
              task.PERIODICITY,
              task.STARTED,
              task.FINISHED
            );
            return (
              <tr
                className={
                  'task-list-table__tr task-list-table__tr_' +
                  checkDLine(task.DEADLINE, task.PERIODICITY, status)
                }
                key={task.ID}
              >
                <td className="task-list-table__td task-list-table__td_narrow">
                  {dlinefromfloat(task.DEADLINE, task.PERIODICITY)}
                </td>
                <td className="task-list-table__td">{task.TASK_NAME}</td>
                <td
                  className={
                    'task-list-table__td task-list-table__td_narrow task-list-table__td-status' +
                    doneByUser(user, task.USERID) //doneByUser adds modifier 'bold'
                  }
                >
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
