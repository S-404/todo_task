import React, {useState} from 'react';
import MyInput from "./UI/input/myInput";
import MyButton from "./UI/button/myButton";

const GroupInviteForm = ({addParticipant}) => {

    const [invUserID, setInvUserID] = useState('');

    const invite = () => {
        if (invUserID) {
            alert(`user ${invUserID.toUpperCase()} has been invited`);
            let newParticipantObj = {USERID: invUserID, ISADMIN: false}
            addParticipant(newParticipantObj);
            setInvUserID('');
        }
    }
    return (
        <div>
            <span>Invite User:</span>
            <MyInput
                value={invUserID}
                type="text"
                labeltext='USER_ID'
                onChange={(e) => setInvUserID(e.target.value)}
            />
            <MyButton onClick={invite}>Invite</MyButton>
        </div>
    );
};

export default GroupInviteForm;