import React, { useState, useEffect } from "react";
import {
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
    Card,
    CardHeader,
    Grid,
    Box,
    Divider,
  } from "@material-ui/core";

import FutureTimeCalc from "../../../../utils/FutureTimeCalc";
import useStyles from './style';
import defaultImg from "../../../../../images/products/defaultImg.jpeg";


const LightBox = ({ product }) => {
    const classes = useStyles();
    const defaultCountDownTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  }
  const [ countDownTime, setCountDownTime ] = useState(defaultCountDownTime);

  function updateTime() {
    setCountDownTime(FutureTimeCalc(product.startTime, product.endTime));
  }

  useEffect(() => {
    let interval = setInterval(() => {updateTime()}, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Box className={classes.lightBox}>
      <Card className={classes.cardRoot}>
        <CardHeader
          className={classes.capitalize}
          color="primary"
          subheader={product.product.name}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component={"img"}
            image={product.product.image ? product.product.image : defaultImg}
            title={product.product.name}
          />
          <CardContent>
            <Divider color="grey" />
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              className={classes.warning}
            >
              Ends in:{" "}
              <span className={`${classes.countdowntime}`}>
                {countDownTime.days}
              </span>
              <span>Days</span>
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.hours}
              </span>
              <span>Hrs</span>
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.minutes}
              </span>
              <span>minutes</span>
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.seconds}
              </span>
              <span>seconds</span>
            </Typography>

            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="body2" component="p">
                  RRP: KSH {product.product.cost}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component="p">
                  Slots Remaining: {product.totalslots ?? 0}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default LightBox;
