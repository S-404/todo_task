import React from 'react';
import MyLabel from '../label/myLabel';
import classes from './mySelect.module.css';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <div className={classes.mySelect}>
            <select
                id={classes.mySelect}
                className={classes.mySelect__select}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.name + option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            {defaultValue ? <MyLabel labeltext={defaultValue} htmlFor={classes.mySelect__select}/> : ''}
        </div>
    );
};

export default MySelect;
