import React from 'react';
import classes from './myTextArea.module.css';
const MyTextArea = React.forwardRef((props, ref) => {
  return (
    <textarea
      ref={ref}
      className={classes.myTextArea}
      {...props}
      rows="5"
      cols="41"
    ></textarea>
  );
});

export default MyTextArea;
