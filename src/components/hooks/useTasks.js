import { useMemo } from 'react';
import { getStatus } from '../../utils/utils.js';

export const useSortedTasks = (tasks, sort, changedStatus) => {
  const sortedTasks = useMemo(() => {
    if (sort) {
      return [...tasks].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return tasks;
  }, [sort, tasks, changedStatus]);
  return sortedTasks;
};

export const useFilteredTasks = (tasks, query, filterColumn) => {
  const filteredTasks = useMemo(() => {
    if (query && filterColumn && query !== 'All') {
      return tasks.filter((task) => {
        let str = task[filterColumn] === null ? '' : task[filterColumn].toLocaleLowerCase();
        return str.includes(query.toLocaleLowerCase());
      });
    }
    return tasks;
  }, [query, tasks]);
  return filteredTasks;
};

export const useFilteredTasksWithStatus = (tasks, query) => {
  const filteredTasks = useMemo(() => {
    if (query && query !== 'All') {
      return tasks.filter((task) => {
        return getStatus(task['PERIODICITY'], task['STARTED'], task['FINISHED']) === query;
      });
    }
    return tasks;
  }, [query, tasks]);
  return filteredTasks;
};

export const useTasks = (tasks, sort, taskGroup, statusFilter, changedStatus) => {
  const sortedTasks = useSortedTasks(tasks, sort, changedStatus);
  const sortedFilteredTasks = useFilteredTasks(sortedTasks, taskGroup, 'TASK_GROUP');

  const result = useFilteredTasksWithStatus(sortedFilteredTasks, statusFilter);

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
