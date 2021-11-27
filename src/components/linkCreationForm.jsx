import React, {useState} from 'react';
import MyInput from "./UI/input/myInput";
import MyButton from "./UI/button/myButton";

const LinkCreationForm = ({createLink, selectedUG, selectedTask}) => {
    let defaultLink = {
        TASK_LINK: '',
        ISMAIN: false,
        USERGROUP_ID:0,
        TASK_ID:0,
        LINK_DESCRIPTION: '',
        ID: 0};
    const [link, setLink] = useState(defaultLink)

    const addNewLink = (e) => {
        e.preventDefault();
        const newLink = {
            ...link,
            ID: Date.now(),
            TASK_ID: selectedTask.ID,
            USERGROUP_ID: selectedUG,
        };
        createLink(newLink);
        setLink(defaultLink);
    };

    return (
        <div>
            <MyInput
                value={link.TASK_LINK}
                type="text"
                labeltext="Link Path"
                onChange={(e) => setLink({...link, TASK_LINK: e.target.value})}
            />
            <MyInput
                value={link.LINK_DESCRIPTION}
                type="text"
                labeltext="Link Description (short name)"
                onChange={(e) => setLink({...link, LINK_DESCRIPTION: e.target.value})}
            />
            <input
                onChange={()=>
                    setLink({...link, ISMAIN: !link.ISMAIN})}
                checked={link.ISMAIN}
                type='checkbox'
            /> is Main Link
            <div>
                <MyButton onClick={addNewLink}>Create Link</MyButton>
            </div>

        </div>
    );
};

export default LinkCreationForm;