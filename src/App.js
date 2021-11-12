import React, { useEffect, useState } from 'react';
import Query from './backend/query';
import { useFetching } from './components/hooks/useFetching';
import { useTaskGroups, useTasks } from './components/hooks/useTasks';
import TaskFilter from './components/taskFilter';
import TaskList from './components/taskList';
import './styles/table.css';
import './styles/app.css';

function App() {
  const user = { userid: 'user' }; //test user obj

  const [selectedUG, setSelectedUG] = useState(0);
  const [userGroups, setUserGroups] = useState([]);
  const defaultUG = (arr) => (arr.length ? arr[0].USERGROUP_ID : 0);
  const [fetchUGData, isUGDataLoading, isUGDataError] = useFetching(
    async () => {
      const response = await Query.getData({
        query: 'USERGROUPS',
        userid: user.userid,
      });
      setUserGroups(response.data);
      if (!selectedUG) setSelectedUG(defaultUG(response.data));
    }
  );
  useEffect(async () => fetchUGData(), []);

  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState({
    sort: '',
    taskGroup: '',
    status: '',
  });
  const [selectedTask, setSelectedTask] = useState({
    taskID: 0,
    taskStatus: '',
  });
  const sortedFilterdTasks = useTasks(
    taskList,
    filter.sort,
    filter.taskGroup,
    filter.status
  );
  const uniqTaskGroups = useTaskGroups(taskList);
  const [fetchTaskList, isTaskListLoading, taskListError] = useFetching(
    async () => {
      const response = await Query.getData({
        query: 'TASK_LIST',
        userid: user.userid,
        selUG: selectedUG,
      });
      setTaskList(response.data);
    }
  );
  useEffect(async () => fetchTaskList(), [selectedUG]);

  const changetaskListValue = (taskID, fieldName, newValue) => {
    let tmpArr = taskList;
    if (tmpArr.length > 0) {
      tmpArr.filter((task) => task.ID === taskID)[0][fieldName] = newValue;
      tmpArr.filter((task) => task.ID === taskID)[0]['LAST_CHANGE'] =
        Date.now();
      tmpArr.filter((task) => task.ID === taskID)[0]['USERID'] = user.userid;
    }
    setTaskList(tmpArr);
  };

  return (
    <div className="App">
      <TaskFilter
        defaultUGvalue={defaultUG(userGroups)}
        setSelectedUG={setSelectedUG}
        userGroups={userGroups}
        filter={filter}
        setFilter={setFilter}
        uniqTaskGroups={uniqTaskGroups}
      />
      <TaskList
        taskList={sortedFilterdTasks}
        user={user.userid}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        changetaskListValue={changetaskListValue}
      />
    </div>
  );
}
export default App;
