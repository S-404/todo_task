import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/myButton";
import {useDispatch, useSelector} from "react-redux";
import GroupParticipants from "./groupParticipants";
import MyLoader from "./UI/loader/myLoader";
import GroupInviteForm from "./groupInviteForm";
import MyModal from "./UI/modal/myModal";
import Query from "../backend/query";
import {useFetching} from "./hooks/useFetching";

const GroupPropertiesForm = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const selectedUG = (useSelector(state => state.user)).selectedUG;

    const [modalInvite, setModalInvite] = useState(false)
    const [participants, setParticipants] = useState([]);

    const [fetchParticipants, isParticipantsLoading, participantsError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: `user/useraccess/userlist/${selectedUG}`,
        });
        setParticipants(responseData);
    });

    useEffect(async () => {
        if (selectedUG) {
            await fetchParticipants();
        }
    }, [selectedUG])


    const addParticipant = async (participantObj) => {
        let param = {query: `user/useraccess`, ...participantObj, USERGROUP_ID: selectedUG}
        const responseData = await Query.addData(param);
        let id = responseData[0].ID
        if (id) {
            setParticipants([...participants.filter((participant) => participant.ID !== id), ...responseData]);
            setModalInvite(false);
        }
    };

    const removeParticipant = async (participantObj) => {
        let param = {query: `user/${participantObj.USERID}/${participantObj.USERGROUP_ID}`}
        const responseData = await Query.deleteData(param);
        let id = responseData[0].ID
        if (id) {
            setParticipants([...participants.filter((participant) => participant.ID !== id)]);
        }
    };

    const updateParticipant = async (participantObj) => {
        let param = {query: `user`, ...participantObj}
        console.log(participantObj)
        const responseData = await Query.updateData(param);
        let id = responseData[0].ID
        console.log(responseData)
        if (id) {
            let usersObj = Object.assign(participants);
            if (usersObj.length > 0) {
                let updRowIndex = usersObj.findIndex((participant) => participant.ID === id);
                usersObj[updRowIndex].ISADMIN = responseData[0].ISADMIN;
                setParticipants([...usersObj]);
            }
        }
    };


    const leaveGroup = async () => {
        if (!window.confirm('You will leave the group. ' +
            'If you are the last member then the group will be deleted')) return;
        let param = {query: `user/${user.userid}/${selectedUG}`}
        const responseData = await Query.deleteData(param);
        if (responseData[0].ID) {
            logout();
        }
    }

    const logout = () => {
        localStorage.removeItem('selectedUG');
        dispatch({type: 'SET_SELECTED_UG', value: 0})
        dispatch({type: 'SET_AUTH', value: false});
        localStorage.removeItem('auth')
        localStorage.removeItem('userid')
    }

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
                                        addParticipant={addParticipant}
                                    />
                                </MyModal>
                                <GroupParticipants
                                    setParticipants={setParticipants}
                                    participants={participants}
                                    setModalInvite={setModalInvite}
                                    removeParticipant={removeParticipant}
                                    updateParticipant={updateParticipant}
                                />
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