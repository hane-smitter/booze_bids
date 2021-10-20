import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { makeBid, fetchLastBidder } from "../../../../actions/products";
import { unsetErr } from "../../../../actions/errors";
import useStyles from "../styles";
import defaultImg from "../../../../images/products/defaultImg.jpeg";
import FutureTimeCalc from "../../../utils/FutureTimeCalc";
import MoneyFormat from "../../../utils/MoneyFormat/index.js";

const ProductDetail = ({product}) => {
    const [ cardBlinking, setCardBlinking ] = useState(!Boolean(product.slots));
    const classes = useStyles();

    const {
      err,
      loading,
      status,
      lastBidder
    } = useSelector((state) => state.app);
    
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

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchLastBidder({"productId": product.product._id}));
    }, []);
    let lb = lastBidder?.bidder?.user?.surname ?? 'Be One';
    function updateTime() {
        setCountDownTime(FutureTimeCalc(product.startTime, product.endTime));
    }
    useEffect(() => {
        let interval = setInterval(() => {updateTime()}, 1000);
        return () => {
        clearInterval(interval);
        };
    }, []);


    const cardVariants = {
        blink: {
        // backgroundColor: ['rgba(255, 255, 255, .9)', 'rgba(237, 82, 73, .1)', 'rgba(243, 32, 19, .3)', 'rgba(237, 82, 73, .1)', 'rgba(255, 255, 255, .9)'],
        backgroundColor: ['#f0f0f0', '#e6c96c', '#ebb957', '#f1a53c', '#f79224'],
        transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            repeatDelay: 1
        }
        },
    }

    return (
        <Link to={location} style={{ textDecoration:'none',color:'black',fontWeight:'bold' }}
            className={classes.darkBox}
            variants={cardVariants}
            animate={cardBlinking ?  "blink" : ""}
            >
            <Typography
            className={cardBlinking ? classes.danger: ''}
              gutterBottom
              variant="body"
              component="p"
            >
              Ends in:{" "}<br/>
              <span style={{ fontFamily:'ticking-time-bomb', fontWeight:'bold', fontSize:'16px'}}>
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
              <span>Sec</span>
              </span>
            </Typography>
            <Typography
              component="div"
              variant="l"
              style={{ textAlign:'center' }}
            >
              RRP@ {MoneyFormat(product.product.cost)} | Lots {product.totalslots ?? 0}
            </Typography>
            <Typography  style={{ fontSize:'11px'}}  component="l">
              Last Bidder: {lb}
            </Typography>
            <Typography style={{ fontSize:'16px'}} className={classes.success} variant="caption" component="p">
              Bid starts @ {MoneyFormat(product.bidPrice)}
            </Typography>
        </Link>
    );
};
export default ProductDetail;