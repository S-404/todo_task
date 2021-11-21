import React from 'react';
import MySelect from './UI/select/mySelect';

const TaskFilter = ({
  selectedUG,
  setSelectedUG,
  userGroups,
  filter,
  setFilter,
  uniqTaskGroups,
}) => {
  return (
    <div className="filter_container">
      <MySelect
        value={selectedUG}
        defaultValue="User Group"
        onChange={(selectedUGValue) => setSelectedUG(selectedUGValue)}
        options={userGroups
          .map((group) => ({
            value: group.USERGROUP_ID,
            name: group.USERGROUP_NAME,
          }))
          .concat({ value: '0', name: '+ Create Group' })}
      />

      <MySelect
        value={filter.taskGroup}
        defaultValue="task group"
        onChange={(selectedFilter) =>
          setFilter({
            ...filter,
            taskGroup: selectedFilter,
          })
        }
        options={[{ value: 'All', name: 'All' }].concat(
          uniqTaskGroups.map((x) => ({
            value: x,
            name: x,
          }))
        )}
      ></MySelect>

      <MySelect
        value={filter.status}
        defaultValue="status"
        onChange={(selectedFilter) =>
          setFilter({
            ...filter,
            status: selectedFilter,
          })
        }
        options={[
          { value: 'All', name: 'All' },
          { value: 'todo', name: 'To do' },
          { value: 'inprocess', name: 'In process' },
          { value: 'done', name: 'Done' },
        ]}
      ></MySelect>
    </div>
  );
};

export default TaskFilter;
