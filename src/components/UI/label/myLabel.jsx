import React from 'react';
import classes from './myLabel.module.css';

const MyLabel = ({labeltext, htmlFor}) => {
    return (
        <label className={classes.myLabel} htmlFor={htmlFor}>
            {labeltext}
        </label>
    );
};

export default MyLabel;
