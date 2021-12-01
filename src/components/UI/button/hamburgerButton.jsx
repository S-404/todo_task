import React from 'react';
import classes from "./hamburgerButton.module.css";

const HamburgerButton = ({...props}) => {
    return (
        <div {...props} className={classes.hamburgerButton}>
            <div/>
            <div/>
            <div/>
        </div>
    );
};

export default HamburgerButton;