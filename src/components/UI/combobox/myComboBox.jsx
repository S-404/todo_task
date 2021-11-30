import React from 'react';
import MyLabel from '../label/myLabel';
import classes from './myComboBox.module.css';

const MyComboBox = ({options, labeltext, value, onChange}) => {
    return (
        <div className={classes.myComboBox}>
            <input
                type="text"
                list={labeltext.split(' ').join('')}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={30}
                className={classes.myComboBox__input}
            />
            <datalist id={labeltext.split(' ').join('')}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </datalist>
            <MyLabel htmlFor={classes.myComboBox__input} labeltext={labeltext}/>
        </div>
    );
};

export default MyComboBox;
