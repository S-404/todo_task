import React from 'react';
import MySelect from './UI/select/MySelect';

const TaskFilter = ({
  defaultUGvalue,
  setSelectedUG,
  userGroups,
  filter,
  setFilter,
  uniqTaskGroups,
}) => {
  return (
    <div className="filter_container">
      <select
        defaultValue={defaultUGvalue}
        onChange={(e) => {
          if (e.target.value !== 0) {
            setSelectedUG(e.target.value);
          }
        }}
      >
        {userGroups.map((row) => (
          <option key={row.USERGROUP_ID} value={row.USERGROUP_ID}>
            {row.USERGROUP_NAME}
          </option>
        ))}
        <option key={userGroups.length + 1} value={0}>
          + Create Group
        </option>
      </select>

      <MySelect
        value={filter.taskGroup}
        defaultValue="task group"
        onChange={(selectedFilter) =>
          setFilter({
            ...filter,
            taskGroup: selectedFilter,
          })
        }
        options={uniqTaskGroups.map((x) => ({
          value: x,
          name: x,
        }))}
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
          { value: '', name: 'All' },
          { value: 'to do', name: 'To do' },
          { value: 'in process', name: 'In proccess' },
          { value: 'done', name: 'Done' },
        ]}
      ></MySelect>
    </div>
  );
};

export default TaskFilter;
