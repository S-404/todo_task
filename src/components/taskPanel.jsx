import React from 'react';
import SmallButton from './UI/button/smallButton.jsx';
import {dlinefromfloat, checkDLine, getStatus} from '../utils/utils.js';

const TaskPanel = ({
                       task,
                       statusView,
                       setStatusView,
                       user,
                       selectedTask,
                       setSelectedTask,
                       changeTaskStatus,
                       taskLinks,
                       setVisible,
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
                newValue = new Date();
                fieldName = 'FINISHED';
                break;
            case 'reset':
                newValue = 0;
                fieldName = 'STARTED';
                break;
            case 'start':
                newValue = new Date();
                fieldName = 'STARTED';
                break;
            default:
                break;
        }
        return [task.ID, fieldName, newValue, statusView];
    };

    const getNewSelectedTaskData = () => {
        const linksArr = taskLinks.filter((link) => link.TASK_ID === task.ID);
        const mainLink = linksArr.filter((link) => link.ISMAIN === true);

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
            taskLinks: linksArr.length
                ? [...linksArr]
                : [{TASK_LINK: '', MAIN_TASK_LINK: 0, LINK_DESCRIPTION: '', ID:0}],
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
                                onClick={() => setVisible('taskProp',true)}
                                className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_properties"
                            >
                                ...
                            </button>
                            {selectedTask.taskMainLink ? (
                                <button onClick={() => {navigator.clipboard.writeText(selectedTask.taskMainLink )}}
                                    className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_link">
                                    link
                                </button>
                            ) : (
                                ''
                            )}
                            {selectedTask.NOTE ? (
                                <button
                                    className="task-option-buttons-div__task-option-button task-option-buttons-div__task-option-button_note">
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
                    <SmallButton
                        text={statusView}
                        onClick={(event) => {
                            event.stopPropagation();
                            changeTaskStatus(...newStatusProps());
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
