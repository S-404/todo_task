import React, { useState } from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyButton from './UI/button/myButton';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';
import { periodicity, dlineOptions } from '../utils/utils';

const TaskCreationForm = ({ createTask, uniqTaskGroups }) => {
  let defaultTask = {
    TASK_NAME: 'New Task Name',
    PERIODICITY: '1',
    DEADLINE: '0',
    TASK_GROUP: '',
    TASK_DESCRIPTION: '',
  };
  const [task, setTask] = useState(defaultTask);

  const addNewTask = (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      ID: Date.now(),
      TASK_GROUP: task.TASK_GROUP === '' ? 'New Tasks' : task.TASK_GROUP,
    };
    createTask(newTask);
    setTask(defaultTask);
  };

  return (
    <form>
      <MyInput
        value={task.TASK_NAME}
        type="text"
        labeltext="New Task Name"
        onChange={(e) => setTask({ ...task, TASK_NAME: e.target.value })}
      />
      <MyComboBox
        options={uniqTaskGroups.map((x) => ({
          value: x,
        }))}
        labeltext="Task Group"
        value={task.TASK_GROUP}
        onChange={(value) => setTask({ ...task, TASK_GROUP: value })}
      />
      <MyTextArea
        value={task.TASK_DESCRIPTION}
        type="text"
        labeltext="Description"
        onChange={(e) => setTask({ ...task, TASK_DESCRIPTION: e.target.value })}
      />
      <div className="deadline-div">
        <MySelect
          value={task.PERIODICITY}
          options={periodicity}
          defaultValue="Periodicity"
          onChange={(selectedPeriodicity) => {
            setTask({
              ...task,
              PERIODICITY: selectedPeriodicity,
              DEADLINE: periodicity.filter((x) => x.value === selectedPeriodicity)[0].dlineArr[0]
                .value,
            });
          }}
        />
        <MySelect
          value={task.DEADLINE}
          options={dlineOptions(task, periodicity)}
          defaultValue="Deadline"
          onChange={(selectedDline) => {
            setTask({ ...task, DEADLINE: selectedDline });
          }}
        />
      </div>
      <MyButton onClick={addNewTask}> Create Task </MyButton>
    </form>
  );
};

export default TaskCreationForm;
