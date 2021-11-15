import React from 'react';
import classes from './myModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.MyModal];
  if (visible) {
    rootClasses.push(classes.active);
  }
  return (
    <div>
      <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        <div
          className={classes.myModalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyModal;
