import React, {useEffect, useState} from 'react';
import MyInput from "./UI/input/myInput";
import MyButton from "./UI/button/myButton";


const LinkPropertiesForm = ({selectedLinkID, selectedTask, updateLink, removeLink}) => {

    const [selectedTaskLink, setSelectedTaskLink] = useState(
        {ID: 0, TASK_ID: 0, TASK_LINK: '', ISMAIN: false, LINK_DESCRIPTION: ''}
    )
    useEffect( () => {
        if(selectedLinkID){
        setSelectedTaskLink(...selectedTask.taskLinks.filter(x => x.ID === selectedLinkID)
        )}
    }, [selectedLinkID])


    return (
        <div>
            <MyInput
                value={selectedTaskLink.TASK_LINK}
                type="text"
                labeltext="Link path"
                onChange={(e) => setSelectedTaskLink({...selectedTaskLink, TASK_LINK: e.target.value})}
            />
            <MyInput
                value={selectedTaskLink.LINK_DESCRIPTION}
                type="text"
                labeltext="Link Description (short name)"
                onChange={(e) => setSelectedTaskLink({...selectedTaskLink, LINK_DESCRIPTION: e.target.value})}
            />
            <div>
            <input
                onChange={()=>
                    setSelectedTaskLink({...selectedTaskLink, ISMAIN: !selectedTaskLink.ISMAIN})}
                checked={selectedTaskLink.ISMAIN}
                type='checkbox'
            /> is Main Link
            </div>

                <MyButton onClick={() => updateLink(selectedTaskLink)}>Update Link</MyButton>
                <MyButton onClick={() => removeLink(selectedTaskLink)}>Remove Link</MyButton>


        </div>
    );
};

export default LinkPropertiesForm;