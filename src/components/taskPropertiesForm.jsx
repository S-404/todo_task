import React, { useEffect, useState } from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyButton from './UI/button/myButton';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';
import { dLinePickerValues, defPeriodicity, periodicity } from '../utils/utils';

const TaskPropertiesForm = ({ task, setTask, uniqTaskGroups }) => {
  const [dlinePickerVal, setDlinePickerVal] = useState(dLinePickerValues('1'));
  return (
    <div>
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
        onChange={(selectedPeriodicity) => {
          setTask({ ...task, PERIODICITY: selectedPeriodicity, DEADLINE: '1' });
          setDlinePickerVal(periodicity.filter((x) => x.value === selectedPeriodicity)[0].dlineArr);
        }}
      />

      <MySelect
        value={task.DEADLINE}
        options={dlinePickerVal}
        defaultValue="Deadline"
        onChange={(selectedDline) => {
          setTask({ ...task, DEADLINE: selectedDline });
        }}
      />
      <MyButton onClick={() => console.log(task)}> Update Task </MyButton>
    </div>
  );
};

export default TaskPropertiesForm;
