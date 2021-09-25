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
import { motion } from "framer-motion"

import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import FutureTimeCalc from "../FutureTimeCalc";

const Product = ({ product }) => {
  const [ cardBlinking, setCardBlinking ] = useState(!Boolean(product.slots));
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
    setCountDownTime(FutureTimeCalc(product.startTime, product.endTime));
  }

  const cardVariants = {
    blink: {
      backgroundColor: ['rgba(255, 255, 255, .9)', 'rgba(237, 82, 73, .1)', 'rgba(243, 32, 19, .3)', 'rgba(237, 82, 73, .1)', 'rgba(255, 255, 255, .9)'],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 3,
        repeatDelay: 1
      }
    },
  }

  return (
    <Button component={Link} to={location}>
      <Card
        className={classes.root,classes.borderBlack}
        component={motion.div}
        variants={cardVariants}
        animate={cardBlinking ?  "blink" : ""}
      >
        <CardHeader
          className={classes.capitalize}
          color="primary"
          subheader={product.product.name}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.product.image || defaultImg}
            title={product.product.name}
          />
          <CardContent className={classes.darkBox}> 
            <Typography
            className={classes.warning}
              gutterBottom
              variant="body2"
              component="p"
            >
              Ends in:{" "}
              <span className={classes.bomb}>
              {countDownTime.days &&
              <span>
                <span className={`${classes.countdowntime}`}>
                  {countDownTime.days}
                </span>
                <span>:</span>
              </span>
              }
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.hours}
              </span>
              <span>:</span>
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.minutes}
              </span>
              <span>:</span>
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.seconds}
              </span>
              </span>
            </Typography>
            <Typography className={classes.success} variant="caption" component="p">
              Bid me at #kes {product.bidPrice} | Slots: {product.totalslots ?? 0}
            </Typography>
            <Typography
              component="div"
              variant="h6"
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
