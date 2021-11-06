import React, { useEffect, useState } from 'react';
import Query from './backend/query';
import { useFetching } from './components/hooks/useFetching';
import { useTaskGroups, useTasks } from './components/hooks/useTasks';
import TaskFilter from './components/taskFilter';
import TaskList from './components/taskList';
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
  console.log(filter);
  return (
    <div>
      <TaskFilter
        defaultUGvalue={defaultUG(userGroups)}
        setSelectedUG={setSelectedUG}
        userGroups={userGroups}
        filter={filter}
        setFilter={setFilter}
        uniqTaskGroups={uniqTaskGroups}
      />
      <TaskList taskList={sortedFilterdTasks} />
    </div>
  );
}
export default App;
