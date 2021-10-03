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
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { makeBid, fetchTopBidder } from "../../../actions/products";
import { unsetErr } from "../../../actions/errors";
import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import FutureTimeCalc from "../../utils/FutureTimeCalc";
import MoneyFormat from "../../utils/MoneyFormat/index.js";

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

  const dispatch = useDispatch();
  const { err, loading } = useSelector((state) => state.app);
  const [nowLoading, setNowLoading] = useState(Boolean(false));

  let formFields = ["bidAmount", "phone"];
  let formErrors = [];
  let formErrorsName = [];
  formErrors =
    err.length && err.filter((error) => formFields.includes(error.param));
  formErrors.length &&
    formErrors.map((error) => formErrorsName.push(error.param));

  const makeBidSchema = Yup.object().shape({
    bidAmount: Yup.number()
      .required("Bidding amount is required")
      .positive("This amount is not allowed")
      .min(product.bidPrice, `Minimum bidding amount is ${product.bidPrice}`)
      .integer(),
    bidder: Yup.object().shape({
      phone: Yup.number("You phone number should be numerical")
        .required("Phone number is required")
        .integer(),
      acknowledgeNew: Yup.boolean(),
      firstname: Yup.string().when("acknowledgeNew", {
        is: true,
        then: Yup.string().required("Your other name(firstname) is required"),
      }),
      lastname: Yup.string().when("acknowledgeNew", {
        is: true,
        then: Yup.string().required("Your surname is required"),
      }),
      location: Yup.string().when("acknowledgeNew", {
        is: true,
        then: Yup.string().required(
          "Your location(e.g nearest town) is required"
        ),
      }),
    }),
  });
  const Input = ({
    form,
    field: { value, name },
    formErrors,
    formErrorsName,
    ...others
  }) => (
    <TextField
      name={name}
      value={value}
      error={
        (form.touched[name] && !!form.errors[name]) ||
        formErrorsName.indexOf(name) !== -1
      }
      helperText={
        (form.touched[name] && form.errors[name]) ||
        (formErrorsName.indexOf(name) !== -1 &&
          formErrors[formErrorsName.indexOf(name)].msg)
      }
      onChange={form.handleChange}
      onBlur={form.handleBlur}
      variant="outlined"
      margin="normal"
      fullWidth
      {...others}
    />
  );
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
      <Card
        className={classes.root,classes.borderBlack}
        component={motion.div}
        variants={cardVariants}
      >
        <CardHeader
          className={classes.capitalize}
          color="primary"
          subheader={product.product.name}
        />
        <CardActionArea>
          <Link to={location}>
            <CardMedia
              className={classes.media}
              image={product.product.image || defaultImg}
              title={product.product.name}
            />
          </Link>
          <CardContent 
          className={classes.darkBox} 
          component={motion.div}
          variants={cardVariants}
          animate={cardBlinking ?  "blink" : ""} > 
          <Link to={location} style={{ textDecoration:'none',color:'black',fontWeight:'bold' }}>
            <Typography
            className={cardBlinking ? classes.danger: ''}
              gutterBottom
              variant="body"
              component="p"
              
            >
              Ends in:{" "}
              <span style={{fontWeight:'bold'}} className={classes.bomb}>
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
              Last Bidder: Anthony
            </Typography>
            <Typography style={{ fontSize:'16px'}} className={classes.success} variant="caption" component="p">
              Bid starts @ {MoneyFormat(product.bidPrice)}
            </Typography>
            </Link>
            {/* form */}
            <Formik
              initialValues={{
                bidAmount: product.bidPrice,
                phone: "",
                bidPrice: product.bidPrice,
                productId: product.product._id,
              }}
              onSubmit={function(values, actions) {
                let currentCard = document.querySelector(`#bid4m-${product._id}`);

                currentCard.dataset.id === product._id && setNowLoading(loading);

                dispatch(makeBid(values));
                actions.setSubmitting(loading);
                /* setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000); */
              }}
              validationSchema={makeBidSchema}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit} id={"bid4m-" + product._id} autoComplete="off" noValidate data-id={product._id}>
                  
                  <Field
                    style={{ padding:0,margin:0 }}
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="bidAmount"
                    placeholder="Bid Amount"
                    component={Input}
                    size="small"
                    inputProps={{ min: product.bidPrice }}
                    type="number"
                  />
                    <Field
                      formErrors={formErrors}
                      formErrorsName={formErrorsName}
                      name="phone"
                      placeholder="Phone Number"
                      component={Input}
                      size="small"
                    />
                      
                  <Button
                    type="submit"
                    variant="contained"
                    style = {{ backgroundColor:'#f79224',color:'#fff' }}
                  >
                    {nowLoading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Place Your Bid"
                    )}
                  </Button>
                </form>
              )}
            </Formik>
            {/* .end of form */}
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

export default Product;
