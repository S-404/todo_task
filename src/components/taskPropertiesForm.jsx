import React from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyButton from './UI/button/myButton';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';
import { periodicity, dlineOptions } from '../utils/utils';
import StatusButton from './UI/button/statusButton';
import LinkPanel from './linkPanel';

const TaskPropertiesForm = ({ task, setTask, uniqTaskGroups, updateTask, removeTask }) => {
  return (
    <div>
      <MyInput
        value={task.TASK_NAME}
        type="text"
        labeltext="Task Name"
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
      <MyTextArea
        value={task.TASK_DESCRIPTION}
        type="text"
        labeltext="Description"
        onChange={(e) => setTask({ ...task, TASK_DESCRIPTION: e.target.value })}
      />
      <MyTextArea
        value={task.NOTE}
        type="text"
        labeltext="Notes"
        onChange={(e) => setTask({ ...task, NOTE: e.target.value })}
      />
      <div
        id="links-div"
        className="links-div"
        style={{ border: '1px solid', borderRadius: '5px' }}
      >
        {task.taskLinks.map((link) => (
          <LinkPanel key={link.ID + 'link'} link={link} />
        ))}
        <StatusButton text={'add new link✚'} />
      </div>
      <MyButton onClick={() => updateTask(task)}>Update Task</MyButton>
      <MyButton onClick={() => removeTask(task)}>Remove Task</MyButton>
    </div>
  );
};

export default TaskPropertiesForm;
