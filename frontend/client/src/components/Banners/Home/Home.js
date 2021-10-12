import { Button, Grid, Paper } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import banner_img from '../../../images/boy.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './styles';
import BannerFile from './Banner';

const Banner = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Paper /* elevation={3} */ className={classes.imgContainer}>
                {/* <img src={banner_img} className={classes.image}/> */}
                <div >
                    <BannerFile/>
                </div>
            </Paper>
        </div>
    )
}

export default Banner;