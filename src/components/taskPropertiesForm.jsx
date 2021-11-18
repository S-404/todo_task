import React, { useEffect, useState } from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyButton from './UI/button/myButton';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';
import { dLinePickerValues, defPeriodicity, periodicity, dlinefromfloat } from '../utils/utils';
import StatusButton from './UI/button/statusButton';

const TaskPropertiesForm = ({ task, setTask, uniqTaskGroups, updateTask, removeTask }) => {
  const [dlinePickerVal, setDlinePickerVal] = useState(dLinePickerValues('1'));

  const dlineArr = () => {
    let addOption = !dlinePickerVal.filter((x) => x.value === task.DEADLINE).length
      ? { name: `${dlinefromfloat(task.DEADLINE, task.PERIODICITY)} `, value: task.DEADLINE }
      : null;
    return addOption ? [addOption, ...dlinePickerVal] : dlinePickerVal;
  };

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
        options={dlineArr()}
        defaultValue="Deadline"
        onChange={(selectedDline) => {
          setTask({ ...task, DEADLINE: selectedDline });
        }}
      />
      <MyTextArea
        value={task.TASK_DESCRIPTION}
        type="text"
        placeholder="Description..."
        onChange={(e) => setTask({ ...task, TASK_DESCRIPTION: e.target.value })}
      />
      <MyTextArea
        value={task.NOTE}
        type="text"
        placeholder="Notes..."
        onChange={(e) => setTask({ ...task, NOTE: e.target.value })}
      />

      <div style={{ border: '1px solid', borderRadius: '5px' }}>
        Links:
        {task.taskLinks.map((link) => (
          <div>
            <a href={link.TASK_LINK}>{link.LINK_DESCRIPTION ? link.LINK_DESCRIPTION : 'link'}</a>
            <StatusButton text={'edit✎'} />
            <StatusButton text={'copy📄'} />
          </div>
        ))}
        <StatusButton text={'add new link✚'} />
      </div>

      <MyButton onClick={() => updateTask(task)}>Update Task</MyButton>
      <MyButton onClick={() => removeTask(task)}>Remove Task</MyButton>
    </div>
  );
};

export default TaskPropertiesForm;
