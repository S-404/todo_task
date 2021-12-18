import React from 'react';
import MyComboBox from './UI/combobox/myComboBox';
import MyInput from './UI/input/myInput';
import MyButton from './UI/button/myButton';
import MyTextArea from './UI/input/myTextArea';
import MySelect from './UI/select/mySelect';
import {periodicity, dlineOptions} from '../utils/utils';
import SmallButton from './UI/button/smallButton';
import LinkPanel from './linkPanel';

const TaskPropertiesForm = ({
                                selectedTask,
                                setSelectedTask,
                                uniqTaskGroups,
                                updateTask,
                                removeTask,
                                setSelectedLinkID,
                                setVisible}) => {
    return (
        <div>
            <MyInput
                value={selectedTask.TASK_NAME}
                type="text"
                labeltext="Task Name"
                onChange={(e) => setSelectedTask({...selectedTask, TASK_NAME: e.target.value})}
            />
            <MyComboBox
                options={uniqTaskGroups.map((x) => ({
                    value: x,
                }))}
                labeltext="Task Group"
                value={selectedTask.TASK_GROUP}
                onChange={(value) => setSelectedTask({...selectedTask, TASK_GROUP: value})}
            />
            <div className="deadline-div">
                <MySelect
                    value={selectedTask.PERIODICITY}
                    options={periodicity}
                    defaultValue="Periodicity"
                    onChange={(selectedPeriodicity) => {
                        setSelectedTask({
                            ...selectedTask,
                            PERIODICITY: +selectedPeriodicity,
                            DEADLINE: periodicity.filter(
                                (x) => x.value === +selectedPeriodicity)[0].dlineArr[0].value,
                        });
                    }}
                />
                <MySelect
                    value={selectedTask.DEADLINE}
                    options={dlineOptions(selectedTask, periodicity)}
                    defaultValue="Deadline"
                    onChange={(selectedDline) => {
                        setSelectedTask({...selectedTask, DEADLINE: selectedDline});
                    }}
                />
            </div>
            <MyTextArea
                value={selectedTask.TASK_DESCRIPTION}
                type="text"
                labeltext="Description"
                rows={selectedTask.TASK_DESCRIPTION? 5: 1}
                onChange={(e) => setSelectedTask({...selectedTask, TASK_DESCRIPTION: e.target.value})}
            />
            <MyTextArea
                value={selectedTask.NOTE}
                type="text"
                labeltext="Notes"
                rows={selectedTask.NOTE? 5: 1}
                onChange={(e) => setSelectedTask({...selectedTask, NOTE: e.target.value})}
            />
            <div
                id="links-div"
                className="links-div"
            >
                {selectedTask.taskLinks.map((link) => (
                    link.TASK_LINK ?
                        <LinkPanel
                            setVisible={setVisible}
                            setSelectedLinkID={setSelectedLinkID}
                            key={link.ID + 'link'}
                            link={link}
                        /> :
                        null
                ))}
                <SmallButton onClick={()=> setVisible('newLink',true)} text={'add new link✚'}/>
            </div>
            <MyButton onClick={() => updateTask(selectedTask)}>Update Task</MyButton>
            <MyButton onClick={() => removeTask(selectedTask)}>Remove Task</MyButton>
        </div>
    );
};

export default TaskPropertiesForm;
