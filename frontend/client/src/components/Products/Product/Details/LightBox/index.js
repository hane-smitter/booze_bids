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
    Button,
  } from "@material-ui/core";

import FutureTimeCalc from "../../../../utils/FutureTimeCalc";
import useStyles from './style';
import defaultImg from "../../../../../images/products/defaultImg.jpeg";
import actionImg from "../../../../../images/auction.jpg";
import bidImg from "../../../../../images/bid.jpeg";
import MoneyFormat from "../../../../utils/MoneyFormat";


const LightBox = ({ product }) => {
  const [ cardBlinking, setCardBlinking ] = useState(!Boolean(product.slots));
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
        <CardActionArea>
          <CardMedia component={"img"} image={bidImg} className={classes.ribbon2}/>
          <CardMedia component={"img"} image={actionImg} className={classes.ribbon}/>
          <CardMedia
            align="center"
            component={"img"}
            className={classes.media}
            image={product.product.image ? product.product.image : defaultImg}
            title={product.product.name}
          >
          </CardMedia>
            
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              align="center"
              className={cardBlinking ? classes.danger: ''}
              style={{fontWeight:'bold'}} 
            >
              Ends in:{" "}
              <span style={{ fontFamily:'ticking-time-bomb', fontSize:'16px', fontWeight:'bold' }}>
                {countDownTime.days != '00' &&
                <span>
                  <span className={`${classes.countdowntime}`}>
                    {countDownTime.days}
                  </span>
                  <span>Days</span>
                </span>
                }
                <span className={`${classes.countdowntime} ${classes.countdown}`}>
                  {countDownTime.hours}
                </span>
                <span>Hrs</span>
                <span className={`${classes.countdowntime} ${classes.countdown}`}>
                  {countDownTime.minutes}
                </span>
                <span>Mins</span>
                <span className={`${classes.countdowntime} ${classes.countdown}`}>
                  {countDownTime.seconds}
                </span>
                <span>Secs</span>
              </span>
            </Typography>
              <Typography variant="body2" align="center" component="p" style={{fontWeight:'bold'}}>
                  RRP @ {MoneyFormat(product.product.cost)}
              </Typography>
              <Typography variant="body2" align="center" component="p" style={{fontWeight:'bold'}}>
                Slots Remaining: {product.totalslots ?? 0}
              </Typography>
            <Grid container>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Purchase @ RRP
              </Button>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default LightBox;
