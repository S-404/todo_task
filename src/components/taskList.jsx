import React from 'react';

const TaskList = ({ taskList }) => {
  return (
    <div className="task_list_container">
      {taskList.map((task) => (
        <div className="task_panel" key={task.ID}>
          {task.TASK_NAME}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
