import React, {useEffect, useState} from 'react';
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
import Query from "../backend/query";
import {getDateFormat} from "../utils/utils";


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
    const [lastUpd, setLastUpd] = useState(getDateFormat(new Date()))
    const [lastTaskListChanges, setLastTaskListChanges] = useState([])
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
    const sortedFilteredTasks = useTasks(taskList, filter.sort, filter.taskGroup, filter.status);

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
    const [fetchTaskLinks] = useFetching(async () => {
        const responseData = await Query.getData({
            query: `tasklinks/${selectedUG}`,
        });
        setTaskLinks(responseData);
    });


    const [fetchLastUpd, isLastUpdLoading, lastUpdError] = useFetching(async () => {
        let prevDate = getDateFormat(new Date());
        const param = {
            query: 'tasks/changes',
            lastchange: lastUpd,
            USERGROUP_ID: selectedUG
        }
        const responseData = await Query.getData(param);
        if (responseData.length) {
            setLastUpd(prevDate)
            setLastTaskListChanges(responseData);
        }
    });

    const [loadCounter, setLoadCounter] = useState(0)

    useEffect(() => {
        const intervalID = setInterval(() => {
            if (!isLastUpdLoading) {
                setLoadCounter((prevCount) => prevCount + 1)
            }
        }, 10000);
        return () => {
            clearInterval(intervalID)
        }
    }, [])

    useEffect(fetchLastUpd, [loadCounter])

    useEffect(() => {
        if (lastTaskListChanges.length) {
            lastTaskListChanges.forEach((task) => {
                console.log(task)
                updateTaskList_Task(task)
            })
        }
    }, [lastTaskListChanges])

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


    const changeTaskStatus = async (taskID, fieldName, newValue, status) => {
        const param = {query: 'tasks/task_status/', status, USERGROUP_ID: selectedUG, ID: taskID, userid: user.userid}
        const responseData = await Query.updateData(param);
        let id = responseData[0].USERGROUP_ID;
        if (id) {
            updateTaskList_Task(responseData[0])
            setSelectedTask({...selectedTask, ID: 0, STATUS: ''});
        }
    }

    const updateTaskList_Task = (data) => {
        let tmpArr = Object.assign(taskList);
        if (tmpArr.length > 0) {
            let updRowIndex = tmpArr.findIndex((task) => task.ID === data.ID)
            tmpArr[updRowIndex].STARTED = data.STARTED;
            tmpArr[updRowIndex].FINISHED = data.FINISHED;
            tmpArr[updRowIndex].LAST_CHANGE = data.LAST_CHANGE;
            tmpArr[updRowIndex].USERID = data.USERID;
        }
        setTaskList(tmpArr);
    }


    const leaveGroup = async () => {
        if (!window.confirm('You will leave the group. ' +
            'If you are the last member then the group will be deleted')) return;
        let param = {query: `user/${user.userid}/${selectedUG}`}
        const responseData = await Query.deleteData(param);
        if (responseData.length) {
            logout()
        }

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
                        <SmallButton onClick={() => setVisible('groupProp', true)} text='Manage Group'/>
                        <SmallButton onClick={() => setVisible('newTask', true)} text='New Task'/>
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
                        sortedFilteredTasks={sortedFilteredTasks}
                        user={user.userid}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        changeTaskStatus={changeTaskStatus}
                        taskLinks={taskLinks}
                        setVisible={setVisible}
                    /> :
                    <GroupCreationForm
                        userGroups={userGroups}
                        setUserGroups={setUserGroups}
                    />
            }
        </div>


    );
}

export default Tasks;
