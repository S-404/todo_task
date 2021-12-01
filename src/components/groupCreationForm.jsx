import React, {useState} from 'react';
import MyInput from "./UI/input/myInput";
import MyButton from "./UI/button/myButton";

const GroupCreationForm = ({createGroup}) => {
    let defaultGroup = {
        USERGROUP:'New Group Name',
        USERGROUP_ID: 0,
    };

    const [group, setGroup] = useState(defaultGroup);

    const addNewGroup = (e) => {
        e.preventDefault();
        const newGroup = {
            ...group,
            USERGROUP_ID: Date.now(),
            USERGROUP: group.USERGROUP === '' ? 'New Group' : group.USERGROUP,
        };
        createGroup(newGroup);
        setGroup(defaultGroup);
    };


    return (
        <div>
            <MyInput
                value={group.USERGROUP}
                type="text"
                labeltext="New Group Name"
                onChange={(e) => setGroup({...group, USERGROUP: e.target.value})}
            />
            <MyButton onClick={addNewGroup}> Create Group </MyButton>
        </div>
    );
};

export default GroupCreationForm;