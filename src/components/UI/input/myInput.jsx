import React from 'react';
import MyLabel from '../label/myLabel';
import classes from './myInput.module.css';
const MyInput = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={classes.myInput}>
      <input className={classes.myInput__input} {...props}></input>
      <MyLabel htmlFor={classes.myInput__input} labeltext={props.labeltext} />
    </div>
  );
});

export default MyInput;
