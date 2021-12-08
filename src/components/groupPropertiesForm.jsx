import React, {useState} from 'react';
import MyButton from "./UI/button/myButton";
import {useSelector} from "react-redux";
import GroupParticipants from "./groupParticipants";
import MyLoader from "./UI/loader/myLoader";
import GroupInviteForm from "./groupInviteForm";
import MyModal from "./UI/modal/myModal";

const GroupPropertiesForm = ({leaveGroup, isParticipantsLoading, setParticipants, participants}) => {
    const user = useSelector(state => state.user);
    const [modalInvite, setModalInvite] = useState(false)

    return (
        <div>
            {
                user.isAdmin ?
                    <div>
                        {(isParticipantsLoading) ?
                            <div className='loader-div'><MyLoader/></div>
                            :
                            <div>
                                <MyModal
                                    setVisible={setModalInvite}
                                    visible={modalInvite}
                                >
                                    <GroupInviteForm
                                        setParticipants={setParticipants}
                                        participants={participants}
                                    />
                                </MyModal>
                                <GroupParticipants
                                    setParticipants={setParticipants}
                                    participants={participants}
                                    setModalInvite={setModalInvite}/>
                            </div>
                        }
                    </div>
                    :
                    null
            }
            <MyButton onClick={leaveGroup}>Leave Group</MyButton>
        </div>
    );
};

export default GroupPropertiesForm;