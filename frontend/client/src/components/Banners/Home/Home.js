import { Button, Grid, Paper } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import banner_img from '../../../images/boy.png';

import useStyles from './styles';

const Banner = () => {
    const classes = useStyles();
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Paper /* elevation={3} */ className={classes.imgContainer}>
            {/* <img src={banner_img} className={classes.image}/> */}
            <Carousel >
                {
                    items.map( (item, i) => 
                    <Item key={i} item={item} /> 
                    )
                }
            </Carousel>
        </Paper>
    )
    function Item(props)
    {
        return (
            <Grid>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>

                <Button className="CheckButton">
                    Check it out!
                </Button>
            </Grid>
        )
    }
}

export default Banner;

