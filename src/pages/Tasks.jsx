import React, {useEffect, useState} from 'react';
import Query from '../backend/query';
import {useFetching} from '../components/hooks/useFetching';
import {useTaskGroups, useTasks} from '../components/hooks/useTasks';
import TaskFilter from '../components/taskFilter';
import TaskList from '../components/taskList';
import '../styles/table.css';
import '../styles/app.css';
import MyModal from '../components/UI/modal/myModal';
import TaskPropertiesForm from '../components/taskPropertiesForm';
import TaskCreationForm from '../components/taskCreationForm';
import LinkPropertiesForm from "../components/linkPropertiesForm";
import LinkCreationForm from "../components/linkCreationForm";
import LoaderSmall from "../components/UI/loader/loaderSmall";
import StatusButton from "../components/UI/button/statusButton";
import MyLoader from "../components/UI/loader/myLoader";
import GroupCreationForm from "../components/groupCreationForm";
import {useDispatch, useSelector} from "react-redux";
import GroupPropertiesForm from "../components/groupPropertiesForm";


function Tasks() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [selectedUG, setSelectedUG] = useState(0);
    const [userGroups, setUserGroups] = useState([]);
    const [participants, setParticipants] = useState([])
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
    const [selectedLinkID, setSelectedLinkID] = useState(0);
    const [filter, setFilter] = useState({
        sort: 'DEADLINE',
        taskGroup: 0,
        status: '',
    });
    const uniqTaskGroups = useTaskGroups(taskList);
    const sortedFilterdTasks = useTasks(taskList, filter.sort, filter.taskGroup, filter.status);
    const [modalNewTask, setModalNewTask] = useState(false);
    const [modalTaskProp, setModalTaskProp] = useState(false);
    const [modalNewLink, setModalNewLink] = useState(false);
    const [modalLinkProp, setModalLinkProp] = useState(false);
    const [modalGroupProp, setModalGroupProp] = useState(false);

    const [fetchUGData, isUGDataLoading, isUGDataError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'USERGROUPS',
            userid: user.userid,
        });
        setUserGroups(responseData);
        if (!selectedUG) setSelectedUG(
            responseData.length ?
                responseData[0].USERGROUP_ID
                : 0
        );
    });

    const [fetchParticipants, isParticipantsLoading, participantsError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'PARTICIPANTS',
            userid: user.userid,
            selUG: selectedUG,
        });
        setParticipants(responseData);
    });

    const [fetchTaskList, isTaskListLoading, taskListError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'TASK_LIST',
            userid: user.userid,
            selUG: selectedUG,
        });
        setTaskList(responseData);
    });

    const [fetchTaskLinks, isTaskLinksLoading, taskLinksError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'TASK_LINKS',
            userid: user.userid,
            selUG: selectedUG,
        });
        setTaskLinks(responseData);
    });

    useEffect(async () => fetchUGData(), [user.userid]);

    useEffect(async () => {
        if (selectedUG) {
            fetchTaskList();
            fetchTaskLinks();
            fetchParticipants();
            dispatch({
                type: 'SET_ADMIN_ROLE',
                value: !!userGroups.filter((userGroup) =>
                    userGroup.ISADMIN  &&
                    userGroup.USERGROUP_ID === selectedUG
                ).length
            })
        }
    }, [selectedUG]);

    const changetaskListValue = (taskID, fieldName, newValue) => {
        let tmpArr = Object.assign(taskList);
        if (tmpArr.length > 0) {
            let updRowIndex = tmpArr.findIndex((task) => task.ID === taskID)
            tmpArr[updRowIndex][fieldName] = newValue;
            tmpArr[updRowIndex].LAST_CHANGE = Date.now();
            tmpArr[updRowIndex].USERID = user.userid;
        }
        setTaskList(tmpArr);
    };
    const createTask = (taskObj) => {
        setTaskList([...taskList, taskObj]);
        setModalNewTask(false);
    };
    const updateTask = (taskObj) => {
        setTaskList([...taskList.filter((x) => x.ID !== taskObj.ID), taskObj]);
        setModalTaskProp(false);
    };
    const removeTask = (taskObj) => {
        setTaskList(taskList.filter((x) => x.ID !== taskObj.ID));
        setModalTaskProp(false);
    };

    const createLink = (linkObj) => {
        setSelectedTask({...selectedTask, taskLinks: [...selectedTask.taskLinks, linkObj]})
        setTaskLinks([...taskLinks, linkObj])
        setModalNewLink(false)
    };
    const updateLink = (linkObj) => {
        let newTaskLinksObj = [...selectedTask.taskLinks.filter((x) => x.ID !== linkObj.ID), linkObj]
        setSelectedTask({...selectedTask, taskLinks: newTaskLinksObj})
        setTaskLinks([...taskLinks.filter((x) => x.ID !== linkObj.ID), linkObj]);
        setModalLinkProp(false)
    };
    const removeLink = (linkObj) => {
        let newTaskLinksObj = [...selectedTask.taskLinks.filter((x) => x.ID !== linkObj.ID)]
        setSelectedTask({...selectedTask, taskLinks: newTaskLinksObj})
        setTaskLinks(taskLinks.filter((x) => x.ID !== linkObj.ID));
        setModalLinkProp(false)
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

    return (
        <div className="App">
            {selectedUG ?
                <div>
                    <MyModal visible={modalNewTask} setVisible={setModalNewTask}>
                        <TaskCreationForm createTask={createTask} uniqTaskGroups={uniqTaskGroups}/>
                    </MyModal>
                    <MyModal visible={modalTaskProp} setVisible={setModalTaskProp}>
                        <TaskPropertiesForm
                            task={selectedTask}
                            setTask={setSelectedTask}
                            uniqTaskGroups={uniqTaskGroups}
                            updateTask={updateTask}
                            removeTask={removeTask}
                            setModalLinkProp={setModalLinkProp}
                            setModalNewLink={setModalNewLink}
                            setSelectedLinkID={setSelectedLinkID}
                        />
                    </MyModal>
                    <MyModal visible={modalLinkProp} setVisible={setModalLinkProp}>
                        <LinkPropertiesForm
                            selectedTask={selectedTask}
                            selectedLinkID={selectedLinkID}
                            updateLink={updateLink}
                            removeLink={removeLink}
                        />
                    </MyModal>
                    <MyModal visible={modalNewLink} setVisible={setModalNewLink}>
                        <LinkCreationForm
                            selectedTask={selectedTask}
                            selectedUG={selectedUG}
                            createLink={createLink}
                        />
                    </MyModal>
                    <MyModal visible={modalGroupProp} setVisible={setModalGroupProp}>
                        <GroupPropertiesForm
                            setParticipants={setParticipants}
                            participants={participants}
                            isParticipantsLoading={isParticipantsLoading}
                            leaveGroup={leaveGroup}
                        />
                    </MyModal>
                </div>
                :
                null
            }
            <div className='control-panel'>
                <TaskFilter
                    selectedUG={selectedUG}
                    setSelectedUG={setSelectedUG}
                    userGroups={userGroups}
                    filter={filter}
                    setFilter={setFilter}
                    uniqTaskGroups={uniqTaskGroups}
                />
                {selectedUG ?
                    <div className="ui_container">
                        <StatusButton text='Manage Group'/>
                        <StatusButton onClick={() => setModalNewTask(true)} text='New Task'/>
                        <StatusButton text='Manual Refresh' onClick={() => fetchTaskList()}/>
                        <LoaderSmall isLoading={isTaskListLoading}/>
                    </div>
                    : null
                }

            </div>
            {(isUGDataLoading) ?
                <div className='loader-div'><MyLoader/></div>
                :
                (selectedUG) ?
                    <TaskList
                        taskList={sortedFilterdTasks}
                        user={user.userid}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        changetaskListValue={changetaskListValue}
                        taskLinks={taskLinks}
                        setVisibleProp={setModalTaskProp}
                        isUGDataLoading={isUGDataLoading}
                    /> :
                    <GroupCreationForm createGroup={createGroup}/>


            }
        </div>


    );
}

export default Tasks;
