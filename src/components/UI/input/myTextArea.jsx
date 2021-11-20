import React from 'react';
import MyLabel from '../label/myLabel';
import classes from './myTextArea.module.css';
const MyTextArea = React.forwardRef((props, ref) => {
  return (
    <div className={classes.myTextArea}>
      <textarea
        ref={ref}
        id={classes.myTextArea__input}
        className={classes.myTextArea__input}
        {...props}
        rows="5"
        cols="41"
      ></textarea>

      <MyLabel htmlFor={classes.myTextArea__input} labeltext={props.labeltext} />
    </div>
  );
});

export default MyTextArea;
