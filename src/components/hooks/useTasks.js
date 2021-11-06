import { useMemo } from 'react';

export const useSortedTasks = (tasks, sort) => {
  const sortedTasks = useMemo(() => {
    if (sort) {
      return [...tasks].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return tasks;
  }, [sort, tasks]);
  return sortedTasks;
};

export const useFilteredTasks = (tasks, query, filterColumn) => {
  const filteredTasks = useMemo(() => {
    if (query && filterColumn) {
      return tasks.filter((task) => {
        return task[filterColumn] === null
          ? false
          : task[filterColumn].toLocaleLowerCase().includes(query);
      });
    }
    return tasks;
  }, [query, tasks]);
  return filteredTasks;
};

export const useTasks = (tasks, sort, taskGroup, status) => {
  const sortedTasks = useSortedTasks(tasks, sort);

  const sortedFilterdTasks = useFilteredTasks(
    sortedTasks,
    taskGroup,
    'TASK_GROUP'
  );

  const result = useFilteredTasks(sortedFilterdTasks, status, 'STATUS');

  return result;
};

export const useTaskGroups = (tasks) => {
  const uniqTaskGroups = useMemo(() => {
    const taskgroups = [];
    tasks.forEach((element) => {
      let group = element['TASK_GROUP'];
      if (taskgroups.indexOf(group) === -1) {
        taskgroups.push(group);
      }
    });
    return taskgroups;
  }, [tasks]);
  return uniqTaskGroups;
};
