import React from 'react';

const TaskFilter = ({
  defaultUGvalue,
  setSelectedUG,
  userGroups,
  filter,
  setFilter,
}) => {
  return (
    <div className="filter_container">
      <div>
        <select
          defaultValue={defaultUGvalue}
          onChange={(e) => {
            if (e.target.value != 0) {
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
      </div>
    </div>
  );
};

export default TaskFilter;
