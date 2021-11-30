import React, {useEffect, useState} from 'react';
import classes from "./loaderSmall.module.css";

const LoaderSmall = (isLoading) => {
    const [loading, setLoading] = useState(false)
    useEffect(() => setLoading(isLoading.isLoading), [isLoading.isLoading])
    console.log(loading)
    return (
        <div className={classes.loader}>

            <div>
                <div className={`${classes.sh1} ${!loading ? classes.disabled : ''}`}/>
                <div className={`${classes.sh2} ${!loading ? classes.disabled : ''}`}/>
            </div>

        </div>
    );
};

export default LoaderSmall;