import { Paper } from '@material-ui/core';
import React from 'react';
import banner_img from '../../../images/banner4.png';

import useStyles from './styles';

const Banner = () => {
    const classes = useStyles();

    return (
        <Paper /* elevation={3} */ className={classes.imgContainer}>
            <img src={banner_img} className={classes.image}/>
        </Paper>
    )
}

export default Banner;
