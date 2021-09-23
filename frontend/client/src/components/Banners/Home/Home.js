import { Paper } from '@material-ui/core';
import React from 'react';
import banner_img from '../../../images/boy.png';

import useStyles from './styles';

const Banner = () => {
    const classes = useStyles();

    return (
        <Paper size="large" sx={{ m: 1 }}/* elevation={3} */ className={classes.imgContainer}>
            <img src={banner_img} className={classes.image}/>
        </Paper>
    )
}

export default Banner;
