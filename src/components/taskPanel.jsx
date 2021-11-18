import React, { useState } from 'react';
import StatusButton from './UI/button/statusButton.jsx';
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
  setVisibleProp,
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

  const doneByUser = (user, complitedBy, status) =>
    complitedBy === user && status !== 'todo' ? '_bold' : '';

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
    const linksArr = taskLinks.filter((taskLinksRow) => taskLinksRow['TASK_ID'] === task.ID);
    const mainLink = linksArr.filter((taskLinksRow) => taskLinksRow['ISMAIN'] == 1);

    return {
      ...selectedTask,
      ID: task.ID,
      TASK_NAME: task.TASK_NAME,
      PERIODICITY: task.PERIODICITY,
      DEADLINE: task.DEADLINE,
      STATUS: status,
      USERID: task.USERID,
      TASK_GROUP: task.TASK_GROUP,
      TASK_DESCRIPTION: task.TASK_DESCRIPTION,
      LAST_CHANGE: task.LAST_CHANGE,
      NOTE: task['NOTE'] ? task['NOTE'] : '',
      taskMainLink: mainLink.length > 0 ? mainLink[0]['TASK_LINK'] : '',
      taskLinks: [...linksArr],
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
        {selectedTask.ID === task.ID ? (
          <div className="task-list-table__task-name-div">
            {task.TASK_NAME}
            <div className="task-name-div__task-option-buttons-div ">
              <button
                onClick={() => setVisibleProp(true)}
                className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_properties"
              >
                ...
              </button>
              {selectedTask.taskMainLink ? (
                <button className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_link">
                  link
                </button>
              ) : (
                ''
              )}
              {selectedTask.NOTE ? (
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
          doneByUser(user, task.USERID, status) //doneByUser adds modifier 'bold'
        }
      >
        {selectedTask.ID === task.ID ? (
          <StatusButton
            text={statusView}
            onClick={(event) => {
              event.stopPropagation();
              changetaskListValue(...newStatusProps());
              setSelectedTask({ ...task, ID: 0, STATUS: '' });
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
