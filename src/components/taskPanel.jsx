import React from 'react';
import StatusButton from './UI/button/StatusButton.jsx';
import { dlinefromfloat, checkDLine, getStatus } from '../utils/utils.js';

const TaskPanel = ({
  task,
  stausView,
  setStatusView,
  user,
  selectedTask,
  setSelectedTask,
}) => {
  let status = getStatus(task.PERIODICITY, task.STARTED, task.FINISHED);

  const defStatusView = (status) => {
    switch (status) {
      case 'inprocess':
        return 'finish';
      case 'done':
        return 'reset';
      default:
        return 'start';
    }
  };

  const doneByUser = (user, complitedBy) =>
    complitedBy === user ? '_bold' : '';

  return (
    <tr
      className={
        'task-list-table__tr task-list-table__tr_' +
        checkDLine(task.DEADLINE, task.PERIODICITY, status)
      }
      onClick={() => {
        setSelectedTask(task.ID);
        setStatusView(defStatusView(status));
      }}
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
        {selectedTask === task.ID ? <StatusButton text={stausView} /> : status}
      </td>
    </tr>
  );
};
export default TaskPanel;
