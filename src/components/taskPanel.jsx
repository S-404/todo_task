import React, { useState } from 'react';
import StatusButton from './UI/button/StatusButton.jsx';
import { dlinefromfloat, checkDLine, getStatus } from '../utils/utils.js';

const TaskPanel = ({
  task,
  statusView,
  setStatusView,
  user,
  selectedTask,
  setSelectedTask,
  changetaskListValue,
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

  const newStatusProps = () => {
    let newValue;
    let fieldName;

    switch (statusView) {
      case 'finish':
        newValue = Date.now();
        fieldName = 'FINISHED';
        break;
      case 'reset':
        newValue = 0;
        fieldName = 'STARTED';
        break;
      case 'start':
        newValue = Date.now();
        fieldName = 'STARTED';
        break;
      default:
        break;
    }
    return [task.ID, fieldName, newValue];
  };
  return (
    <tr
      className={
        'task-list-table__tr task-list-table__tr_' +
        checkDLine(task.DEADLINE, task.PERIODICITY, status)
      }
      onClick={() => {
        setStatusView(defStatusView(status));
        setSelectedTask({ taskID: task.ID, taskStatus: status });
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
        {selectedTask.taskID === task.ID ? (
          <StatusButton
            text={statusView}
            onClick={(event) => {
              event.stopPropagation();
              changetaskListValue(...newStatusProps());
              setSelectedTask({ taskID: 0, taskStatus: '' });
            }}
          />
        ) : (
          status
        )}
      </td>
    </tr>
  );
};
export default TaskPanel;
