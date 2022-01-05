import React, {useRef, useEffect} from 'react';

export const useInterval = (callback, delay) => {

    const cachedCallback = useRef(null);

    useEffect(() => {
        cachedCallback.current = callback;
    }, [callback]);

    useEffect(() => {

        const callCachedCallback = () => {
            cachedCallback.current();
        }

        if (delay !== null) {
            let intervalID = setInterval(callCachedCallback, delay);
            return () => clearInterval(intervalID);
        }

    }, [delay]);
}
