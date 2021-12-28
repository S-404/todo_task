import React, {useEffect, useState} from 'react';
import MyInput from "./UI/input/myInput";
import MyButton from "./UI/button/myButton";
import {useFetching} from "./hooks/useFetching";
import {useDispatch, useSelector} from "react-redux";
import Query from "../backend/query";
const GroupCreationForm = ({userGroups, setUserGroups}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const defaultGroup = {
        USERGROUP: 'New Group Name',
        USERGROUP_ID: 0,
    };

    const [group, setGroup] = useState(defaultGroup);

    const [createGroup, isCreateGroupLoading, createGroupError] = useFetching(async () => {
        const groupObj = {
            ...group,
            USERGROUP: group.USERGROUP === '' ? 'New Group' : group.USERGROUP,
        };
        const param = {query: 'usergroup', name: groupObj.USERGROUP, userid: user.userid}
        const responseData = await Query.addData(param);
        let id = responseData[0].USERGROUP_ID;
        if (id) {
            group.USERGROUP_ID = id
            groupObj.USERGROUP_ID = id;
            groupObj.USERID = user.userid;
            groupObj.ISADMIN = true;
            setUserGroups([...userGroups, groupObj]);
        }
    })

    useEffect(async () => {
            if (group.USERGROUP_ID) {
                dispatch({
                    type: 'SET_SELECTED_UG',
                    value: group.USERGROUP_ID,
                })
            }
        }
        , [group.USERGROUP_ID])

    const addNewGroup = async (e) => {
        e.preventDefault();
        await createGroup();
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