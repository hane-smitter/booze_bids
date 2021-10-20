import React, { useState, useEffect }  from 'react'
import useStyles from './styles';

export const Timer = () => {
    const classes = useStyles();
    useEffect(() => {
        let interval = setInterval(() => {updateTime()}, 1000);
        return () => {
        clearInterval(interval);
        };
    }, []);
    const defaultRemainingTime = new Date().toLocaleString('en-US', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'short', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        second: 'numeric', // numeric, 2-digit
    });
    const [countDownTime, setCountDownTime] = useState(defaultRemainingTime);
    function updateTime() {
        setCountDownTime(new Date().toLocaleString('en-US', {
            weekday: 'short', // long, short, narrow
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'short', // numeric, 2-digit, long, short, narrow
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
            second: 'numeric', // numeric, 2-digit
        }));
    }
    return (
        <span className={classes.time} style={{ fontFamily:'ticking-time-bomb'}}> 
            { countDownTime } 
        </span>
    )
}
