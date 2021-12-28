import React, {useEffect, useState} from 'react';
import Query from '../backend/query';
import {useFetching} from '../components/hooks/useFetching';
import {useTaskGroups, useTasks} from '../components/hooks/useTasks';
import TaskFilter from '../components/taskFilter';
import TaskList from '../components/taskList';
import '../styles/table.css';
import '../styles/app.css';
import LoaderSmall from "../components/UI/loader/loaderSmall";
import SmallButton from "../components/UI/button/smallButton";
import MyLoader from "../components/UI/loader/myLoader";
import GroupCreationForm from "../components/groupCreationForm";
import {useDispatch, useSelector} from "react-redux";
import ModalPropForms from "../components/modalPropForms";


function Tasks() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const selectedUG = (useSelector(state => state.user)).selectedUG
    const logout = () => {
        dispatch({type: 'SET_AUTH', value: false});
        localStorage.removeItem('auth')
        localStorage.removeItem('userid')
    }

    const [userGroups, setUserGroups] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [taskLinks, setTaskLinks] = useState([{
        ID: 0
        , USERGROUP_ID: 0
        , TASK_ID: 0
        , TASK_LINK: ''
        , ISMAIN: false
        , LINK_DESCRIPTION: ''
    }]);
    const [selectedTask, setSelectedTask] = useState({
        ID: 0,
        TASK_NAME: '',
        PERIODICITY: 0,
        DEADLINE: 0,
        STATUS: '',
        USERID: '',
        TASK_GROUP: '',
        TASK_DESCRIPTION: '',
        LAST_CHANGE: 0,
        NOTE: '',
        taskMainLink: '',
        taskLinks: [{TASK_LINK: '', MAIN_TASK_LINK: 0, LINK_DESCRIPTION: '', ID: 0}],
    });

    const [filter, setFilter] = useState({
        sort: 'DEADLINE',
        taskGroup: 0,
        status: '',
    });
    const uniqTaskGroups = useTaskGroups(taskList);
    const sortedFilterdTasks = useTasks(taskList, filter.sort, filter.taskGroup, filter.status);

    const [modalForms, setModalForms] = useState({
        newTask: false,
        taskProp: false,
        newLink: false,
        linkProp: false,
        groupProp: false,
    })

    const [fetchUGData, isUGDataLoading, isUGDataError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'usergroup',
            userid: user.userid,
        });
        setUserGroups(responseData);
    });
    const [fetchTaskList, isTaskListLoading, taskListError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: `tasks/list/${selectedUG}`,
        });
        setTaskList(responseData);
    });

    const [fetchTaskLinks, isTaskLinksLoading, taskLinksError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: `tasklinks/${selectedUG}`,
        });
        setTaskLinks(responseData);
    });

    useEffect(async () => await fetchUGData(), [user.userid]);
    useEffect(async () => {
        if (selectedUG) {
            await fetchTaskList();
            await fetchTaskLinks();
            dispatch({
                type: 'SET_ADMIN_ROLE',
                value: !!userGroups.filter((userGroup) =>
                    userGroup.ISADMIN &&
                    userGroup.USERGROUP_ID === selectedUG
                ).length
            })
        }
        localStorage.setItem('selectedUG', selectedUG)
    }, [selectedUG]);

    const changeTaskListValue = (taskID, fieldName, newValue) => {
        let tmpArr = Object.assign(taskList);
        if (tmpArr.length > 0) {
            let updRowIndex = tmpArr.findIndex((task) => task.ID === taskID)
            tmpArr[updRowIndex][fieldName] = newValue;
            tmpArr[updRowIndex].LAST_CHANGE = Date.now();
            tmpArr[updRowIndex].USERID = user.userid;
        }
        setTaskList(tmpArr);
    };

    const createGroup = (groupObj) => {
        groupObj.USERID = user.userid;
        groupObj.ISADMIN = true;
        setUserGroups([...userGroups, groupObj]);
        setSelectedUG(groupObj.USERGROUP_ID)
    }

    const leaveGroup = () => {
        if (!window.confirm('You will leave the group. ' +
            'If you are the last member then the group will be deleted')) return;
    }

    const setVisible = (key, value) => {
        setModalForms({...modalForms, [key]: value})
    }
    return (
        <div className="Tasks">
            {selectedUG ?
                <ModalPropForms
                    selectedUG={selectedUG}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    taskLinks={taskLinks}
                    setTaskLinks={setTaskLinks}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    modalForms={modalForms}
                    setModalForms={setModalForms}
                    uniqTaskGroups={uniqTaskGroups}
                    leaveGroup={leaveGroup}
                    setVisible={setVisible}
                />
                :
                null
            }
            <div className='control-panel'>
                <TaskFilter
                    userGroups={userGroups}
                    filter={filter}
                    setFilter={setFilter}
                    uniqTaskGroups={uniqTaskGroups}
                />
                {selectedUG ?
                    <div className="ui_container">
                        <SmallButton onClick={() => setVisible('groupProp',true)} text='Manage Group'/>
                        <SmallButton onClick={() => setVisible('newTask',true)} text='New Task'/>
                        <SmallButton onClick={() => fetchTaskList()} text='Manual Refresh'/>
                        <LoaderSmall isLoading={isTaskListLoading}/>
                    </div>
                    : null
                }

            </div>
            {(isUGDataLoading || isTaskListLoading) ?
                <div className='loader-div'><MyLoader/></div>
                :
                (selectedUG) ?
                    <TaskList
                        taskList={sortedFilterdTasks}
                        user={user.userid}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        changeTaskListValue={changeTaskListValue}
                        taskLinks={taskLinks}
                        setVisible={setVisible}
                    /> :
                    <GroupCreationForm createGroup={createGroup}/>
            }
        </div>


    );
}

export default Tasks;
