import React from 'react';
import classes from "./myCheckbox.module.css";
const MyCheckbox = ({text,isChecked, onChange, props}) => {
    return (
        <div className={classes.myCheckbox}>
            <input
                className={classes.myCheckbox__input}
                type='checkbox'
                checked={isChecked}
                onChange={onChange}
                {...props}/>
            <label className={classes.myCheckbox__label}>{text}</label>
        </div>
    );
};

export default MyCheckbox;