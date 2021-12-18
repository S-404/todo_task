import React from 'react';
import classes from './myModal.module.css';
import MyCloseButton from "../button/myCloseButton";

const MyModal = ({children,name, visible, setVisible}) => {
    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }
    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setVisible(name,false)}
        >
            <MyCloseButton/>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
