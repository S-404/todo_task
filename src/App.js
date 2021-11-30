import React, {useEffect, useState} from 'react';
import Query from './backend/query';
import {useFetching} from './components/hooks/useFetching';
import {useTaskGroups, useTasks} from './components/hooks/useTasks';
import TaskFilter from './components/taskFilter';
import TaskList from './components/taskList';
import './styles/table.css';
import './styles/app.css';
import MyModal from './components/UI/modal/myModal';
import TaskPropertiesForm from './components/taskPropertiesForm';
import TaskCreationForm from './components/taskCreationForm';
import LinkPropertiesForm from "./components/linkPropertiesForm";
import LinkCreationForm from "./components/linkCreationForm";
import LoaderSmall from "./components/UI/loader/loaderSmall";
import StatusButton from "./components/UI/button/statusButton";


function App() {
    const user = {userid: 'user'}; //test user obj

    const [selectedUG, setSelectedUG] = useState(0);
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


    const [fetchUGData, isUGDataLoading, isUGDataError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'USERGROUPS',
            userid: user.userid,
        });
        setUserGroups(responseData);
        if (!selectedUG) setSelectedUG(defaultUG(responseData));
    });
    const defaultUG = (arr) => (arr.length ? arr[0].USERGROUP_ID : 0);

    const [fetchTaskList, isTaskListLoading, taskListError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'TASK_LIST',
            userid: user.userid,
            selUG: selectedUG,
        });
        setTaskList( responseData );
    });

    const [fetchTaskLinks, isTaskLinksLoading, taskLinksError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: 'TASK_LINKS',
            userid: user.userid,
            selUG: selectedUG,
        });
        setTaskLinks(responseData);
    });

    useEffect(async () => fetchUGData(), []);
    useEffect(async () => {
        fetchTaskList();
        fetchTaskLinks();
    }, [selectedUG]);

    const changetaskListValue = (taskID, fieldName, newValue) => {
        let tmpArr = Object.assign(taskList);
        if (tmpArr.length > 0) {
            tmpArr.filter((task) => task.ID === taskID)[0][fieldName] = newValue;
            tmpArr.filter((task) => task.ID === taskID)[0]['LAST_CHANGE'] = Date.now();
            tmpArr.filter((task) => task.ID === taskID)[0]['USERID'] = user.userid;
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
        setSelectedTask({...selectedTask, taskLinks: [...selectedTask.taskLinks,linkObj] })
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

    return (
        <div className="App">
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
            <div className='nav-panel'>

            <TaskFilter
                selectedUG={selectedUG}
                setSelectedUG={setSelectedUG}
                userGroups={userGroups}
                filter={filter}
                setFilter={setFilter}
                uniqTaskGroups={uniqTaskGroups}
            />
                <div className="ui_container">
                <StatusButton text='Manage Group'/>
                <StatusButton onClick={() => setModalNewTask(true)} text='New Task'/>
                <StatusButton text='Manual Refresh' onClick={()=> fetchTaskList()}/>
                <LoaderSmall isLoading={isTaskListLoading}/>
            </div>
            </div>
            <TaskList
                taskList={sortedFilterdTasks}
                user={user.userid}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                changetaskListValue={changetaskListValue}
                taskLinks={taskLinks}
                setVisibleProp={setModalTaskProp}
                isUGDataLoading={isUGDataLoading}
            />
        </div>
    );
}

export default App;
