import React, {useEffect, useState} from 'react';
import SmallButton from "./UI/button/smallButton";
import MyCheckbox from "./UI/checkbox/myCheckbox";

const GroupParticipants = ({setParticipants, participants,setModalInvite}) => {
    const [newPartList, setNewPartList] = useState(
        [{USERID: '', ISADMIN: false}]
    )
    useEffect( () => {
        setNewPartList([...participants])
    }, [participants])

    const appointAdmin = (userid)=>{
        let usersObj = Object.assign(newPartList);
        if (usersObj.length > 0) {
            let updRowIndex = usersObj.findIndex((user) => user.USERID === userid)
            usersObj[updRowIndex].ISADMIN = !usersObj[updRowIndex].ISADMIN;
        }
        setParticipants([...usersObj]);
    }

    const excludeUser = (userid)=>{
        if (!window.confirm(`User ${userid.toUpperCase()} will be excluded`)) return;
        setParticipants(participants.filter((user) => user.USERID !== userid))
    }



    return (
        <div>
            <span>Group Participants:</span>
            <div className='participants-list'>
                {newPartList.map((participant, index) => (
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
                                onChange={()=>appointAdmin(participant.USERID)}
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
                    onClick={()=> setModalInvite(true)}
                />
            </div>
        </div>
    );
};

export default GroupParticipants;