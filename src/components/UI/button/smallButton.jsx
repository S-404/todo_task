import React from 'react';
import classes from './smallButton.module.css';

const SmallButton = ({text, ...props}) => {
    return (
        <button {...props} className={classes.smallButton}>
            {text}
        </button>
    );
};

export default SmallButton;
