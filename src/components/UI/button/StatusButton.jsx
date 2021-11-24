import React from 'react';
import classes from './statusButton.module.css';

const StatusButton = ({text, ...props}) => {
    return (
        <button {...props} className={classes.statusButton}>
            {text}
        </button>
    );
};

export default StatusButton;
