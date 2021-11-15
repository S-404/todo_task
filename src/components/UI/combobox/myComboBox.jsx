import React from 'react';
import classes from './myComboBox.module.css';

const MyComboBox = ({ options, placeholder, value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        list={placeholder.replace(' ', '')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={30}
        className={classes.myComboBox}
      />
      <datalist id={placeholder.replace(' ', '')}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default MyComboBox;
