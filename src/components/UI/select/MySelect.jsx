import React from 'react';
import classes from './mySelect.module.css';
const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <div>
      <select className={classes.mySelect} value={value} onChange={(e) => onChange(e.target.value)}>
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
