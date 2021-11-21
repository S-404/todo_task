import React from 'react';
import MyLabel from '../label/myLabel';
import classes from './myComboBox.module.css';

const MyComboBox = ({ options, labeltext, value, onChange, ...props }) => {
  return (
    <div className={classes.myComboBox}>
      <input
        type="text"
        list={labeltext.replace(' ', '')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={30}
        className={classes.myComboBox__input}
      />
      <datalist id={labeltext.replace(' ', '')}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </datalist>
      <MyLabel htmlFor={classes.myComboBox__input} labeltext={labeltext} />
    </div>
  );
};

export default MyComboBox;
