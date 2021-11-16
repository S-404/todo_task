import React, { useEffect, useState } from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyButton from './UI/button/myButton';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';
import { wkdays, pad, dlineToFloat } from '../utils/utils';

const TaskCreationForm = ({ createTask, uniqTaskGroups }) => {
  const [task, setTask] = useState({
    TASK_NAME: 'New Task Name',
    PERIODICITY: '1',
    DEADLINE: '1',
    TASK_GROUP: '',
    TASK_DESCRIPTION: '',
  });

  const [dlinePickerVal, setDlinePickerVal] = useState(dLinePickerValues('1'));

  const defPeriodicity = (val) => {
    return periodicity.filter((x) => x.value === val).name;
  };

  function dLinePickerValues(periodicityValue) {
    const dlineObj = [];
    switch (periodicityValue) {
      case '1':
        for (let hh = 0; hh <= 23; hh++) {
          for (let mm = 0; mm <= 59; mm += 15) {
            dlineObj.push({
              name: `${pad(hh, 2)}:${pad(mm, 2)}`,
              value: `${dlineToFloat(hh, mm)}`,
            });
          }
        }
        break;
      case '7':
        wkdays.map((item, index) => {
          dlineObj.push({ name: item, value: `${index}` });
        });
        break;
      case '30':
        for (let d = 1; d <= 31; d++) {
          dlineObj.push({ name: d, value: `${d}` });
        }
        break;
      default:
        dlineObj.push({ name: '', value: '' });
        break;
    }
    return dlineObj;
  }

  const addNewTask = (e) => {
    e.preventDefault();
    const newTask = { ...task, ID: Date.now() };
    createTask(newTask);
    setTask({
      TASK_NAME: 'New Task Name',
      PERIODICITY: '1',
      DEADLINE: '1',
      TASK_GROUP: '',
      TASK_DESCRIPTION: '',
    });
  };

  let periodicity = [
    { name: 'Daily', value: '1', dlineArr: dLinePickerValues('1') },
    { name: 'Weekly', value: '7', dlineArr: dLinePickerValues('7') },
    { name: 'Monthly', value: '30', dlineArr: dLinePickerValues('30') },
  ];

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
      <MyButton onClick={addNewTask}> Create Task </MyButton>
    </form>
  );
};

export default TaskCreationForm;
