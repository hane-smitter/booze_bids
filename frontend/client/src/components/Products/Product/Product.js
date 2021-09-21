import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import FutureTimeCalc from "../FutureTimeCalc";

const Product = ({ calcTime, product }) => {
  const classes = useStyles();

  const location = {
    pathname: "/detail",
    state: { product },
  };

  const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  };

  const [countDownTime, setCountDownTime] = useState(defaultRemainingTime);

  useEffect(() => {
    let interval = setInterval(() => {
      upDateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function upDateTime() {
    console.log("hello world");
    console.log(FutureTimeCalc(product.startTime, product.endTime));
    console.log(countDownTime);
    setCountDownTime(FutureTimeCalc(product.startTime, product.endTime));
  }

  return (
    <Button component={Link} to={location}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.capitalize}
          color="primary"
          subheader={product.product.name}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.product.image ? product.product.image : defaultImg}
            title={product.product.name}
          />
          <CardContent>
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
            <Typography variant="caption" component="p">
              Bid me at #kes {product.bidPrice} | Slots: {product.slots ?? 0}
            </Typography>
            <Typography
              component="div"
              variant="h5"
              style={{ fontWeight: "bold" }}
            >
              RRP: KSH {product.product.cost}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>
  );
};

export default Product;
