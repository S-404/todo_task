import React, {useState} from 'react';
import TaskPanel from './taskPanel.jsx';

const TaskList = ({
                      sortedFilteredTasks,
                      user,
                      selectedTask,
                      setSelectedTask,
                      changeTaskStatus,
                      taskLinks,
                      setVisible,
                  }) => {
    const [statusView, setStatusView] = useState('');

    return (
        <div className="task-list-container">
                <table className="task-list-table">
                    <thead className="task-list-table__thead">
                    <tr className="task-list-table__tr">
                        <th className="task-list-table__th task-list-table__th_narrow">DLine</th>
                        <th className="task-list-table__th">Task</th>
                        <th className="task-list-table__th task-list-table__th_narrow">Status</th>
                    </tr>
                    </thead>
                    <tbody className="task-list-table__tbody">
                    {sortedFilteredTasks.map((task) => {
                        return (
                            <TaskPanel
                                key={task.ID}
                                task={task}
                                statusView={statusView}
                                setStatusView={setStatusView}
                                user={user}
                                selectedTask={selectedTask}
                                setSelectedTask={setSelectedTask}
                                changeTaskStatus={changeTaskStatus}
                                taskLinks={taskLinks}
                                setVisible={setVisible}
                            />
                        );
                    })}
                    </tbody>
                </table>
        </div>
    );
};

export default TaskList;
