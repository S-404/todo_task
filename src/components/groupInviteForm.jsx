import React, {useState} from 'react';
import MyInput from "./UI/input/myInput";
import MyButton from "./UI/button/myButton";

const GroupInviteForm = ({setParticipants,participants}) => {
    const [invUserID, setInvUserID] = useState('')
    const invite = () => {
        if (invUserID) {
            alert(`user ${invUserID.toUpperCase()} has been invited`);
            setParticipants([...participants,{USERID: invUserID, ISADMIN:false}])
            setInvUserID('')
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