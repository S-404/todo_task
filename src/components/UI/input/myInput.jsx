import React from 'react';
import classes from './myInput.module.css';
const MyInput = React.forwardRef((props) => {
  return <input className={classes.myInput} {...props}></input>;
});

export default MyInput;
