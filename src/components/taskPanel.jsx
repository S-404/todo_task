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
  taskLinks,
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

  const getNewSelectedTaskData = () => {
    const tmpLinkArr = taskLinks.filter(
      (taskLinksRow) =>
        taskLinksRow['TASK_ID'] === task.ID &&
        taskLinksRow['MAIN_TASK_LINK'] == 1
    );
    const mainLink = tmpLinkArr.length > 0 ? tmpLinkArr[0]['TASK_LINK'] : '';
    const note = task['NOTE'];
    return {
      ...selectedTask,
      taskID: task.ID,
      taskStatus: status,
      taskMainLink: mainLink,
      taskNote: note,
    };
  };

  return (
    <tr
      className={
        'task-list-table__tr task-list-table__tr_' +
        checkDLine(task.DEADLINE, task.PERIODICITY, status)
      }
      onClick={() => {
        setStatusView(defStatusView(status));
        setSelectedTask(getNewSelectedTaskData());
      }}
    >
      <td className="task-list-table__td task-list-table__td_narrow">
        {dlinefromfloat(task.DEADLINE, task.PERIODICITY)}
      </td>
      <td className="task-list-table__td">
        {selectedTask.taskID === task.ID ? (
          <div className="task-list-table__task-name-div">
            {task.TASK_NAME}
            <div className="task-name-div__task-option-buttons-div ">
              <button className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_properties">
                ...
              </button>
              {selectedTask.taskMainLink ? (
                <button className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_link">
                  link
                </button>
              ) : (
                ''
              )}
              {selectedTask.taskNote ? (
                <button className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_note">
                  !
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          task.TASK_NAME
        )}
      </td>
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
