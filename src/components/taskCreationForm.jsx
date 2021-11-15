import React, { useState } from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';

const TaskCreationForm = ({ create, uniqTaskGroups }) => {
  const [task, setTask] = useState({
    TASK_NAME: 'New Task Name',
    PERIODICITY: 1,
    DEADLINE: 0,
    TASK_GROUP: '',
    TASK_DESCRIPTION: '',
  });

  let periodicity = [
    { name: 'Daily', value: 1 },
    { name: 'Weekly', value: 7 },
    { name: 'Monthly', value: 30 },
  ];
  const defPeriodicity = (val) => {
    return periodicity.filter((x) => x.value === val).name;
  };
  return (
    <form>
      <MyInput
        value={task.TASK_NAME}
        type="text"
        placeholder="New Task Name"
        onChange={(e) => setTask({ ...task, TASK_NAME: e.target.value })}
      />
      <MyComboBox
        options={uniqTaskGroups.map((x) => ({
          value: x,
        }))}
        placeholder="Task Group"
        value={task.TASK_GROUP}
        onChange={(value) => setTask({ ...task, TASK_GROUP: value })}
      />
      <MyTextArea
        value={task.TASK_DESCRIPTION}
        type="text"
        placeholder="Description"
        onChange={(e) => setTask({ ...task, TASK_DESCRIPTION: e.target.value })}
      />
      <MySelect
        value={defPeriodicity(task.PERIODICITY)}
        options={periodicity}
        defaultValue="Periodicity"
        onChange={(selectedPeriodicity) =>
          setTask({ ...task, PERIODICITY: selectedPeriodicity })
        }
      />
    </form>
  );
};

export default TaskCreationForm;
