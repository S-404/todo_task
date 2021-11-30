import React, {useEffect, useState} from 'react';
import classes from "./loaderSmall.module.css";

const LoaderSmall = (isLoading) => {
    return (
        <div className={classes.loader}>
                <div className={`${classes.sh1} ${!isLoading.isLoading ? classes.disabled : ''}`}/>
                <div className={`${classes.sh2} ${!isLoading.isLoading ? classes.disabled : ''}`}/>
        </div>
    );
};

export default LoaderSmall;