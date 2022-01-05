import React from 'react';
import SmallButton from "./UI/button/smallButton";
import MyCheckbox from "./UI/checkbox/myCheckbox";

const GroupParticipants = ({participants,setModalInvite,updateParticipant,removeParticipant}) => {

    const appointAdmin = (userid) => {
        let userObj = Object.assign(participants.filter((user) => user.USERID === userid));
        if (userObj.length) {
            updateParticipant({...userObj[0], ISADMIN: !userObj[0].ISADMIN})
        }
    }

    const excludeUser = (userid) => {
        if (!window.confirm(`User ${userid.toUpperCase()} will be excluded`)) return;
        let userObj = Object.assign(participants.filter((user) => user.USERID === userid));
        if (userObj.length) {
            removeParticipant(userObj[0]);
        }
    }

    return (
        <div>
            <span>Group Participants:</span>
            <div className='participants-list'>
                {participants.map((participant, index) => (
                    <div
                        className='participants-list__participant-panel'
                        key={`participant${participant.USERID + index}`}>
                        <span className='participant-panel__userid'>
                            {participant.USERID.toUpperCase()}
                        </span>
                        <div className='participant-panel__inputs-div'>
                            <MyCheckbox
                                text='Admin'
                                isChecked={!!participant.ISADMIN}
                                onChange={() => appointAdmin(participant.USERID)}
                            />
                            <SmallButton
                                text='exclude'
                                onClick={() => excludeUser(participant.USERID)}
                            />
                        </div>
                    </div>
                ))
                }
                <SmallButton
                    text='invite user'
                    onClick={() => setModalInvite(true)}
                />
            </div>
        </div>
    );
};

export default GroupParticipants;