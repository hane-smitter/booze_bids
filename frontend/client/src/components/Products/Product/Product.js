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
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { makeBid } from "../../../actions/products";
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
      .positive(),
    phone: Yup.number().required("Phone number is required").integer(),
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
  useEffect(() => {
    let interval = setInterval(() => {
      upDateTime();
    }, 1000);
    return () => clearInterval(interval);
    return () => {
      dispatch(unsetErr());
    };
  }, []);

  function upDateTime() {
    setCountDownTime(FutureTimeCalc(product.startTime, product.endTime));
  }

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
          <Button component={Link} to={location}>
            <CardMedia
              className={classes.media}
              image={product.product.image || defaultImg}
              title={product.product.name}
            />
          </Button>
          <CardContent 
          className={classes.darkBox} 
          component={motion.div}
          variants={cardVariants}
          animate={cardBlinking ?  "blink" : ""} > 
            <Typography
            className={cardBlinking ? classes.danger: classes.warning}
              gutterBottom
              variant="body2"
              component="p"
              
            >
              Ends in:{" "}
              <span className={classes.bomb}>
              {countDownTime.days != '00' &&
              <span>
                <span className={`${classes.countdowntime}`}>
                  {countDownTime.days}
                </span>
                <span>Days:</span>
              </span>
              }
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.hours}
              </span>
              <span>Hrs:</span>
              <span className={`${classes.countdowntime} ${classes.countdown}`}>
                {countDownTime.minutes}
              </span>
              <span>Mins:</span>
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
              RRP: {MoneyFormat(product.product.cost)} | Slots: {product.totalslots ?? 0}
            </Typography>
            <Typography className={classes.success} variant="caption" component="p">
              Bid starts @ {MoneyFormat(product.bidPrice)}
            </Typography>
            {/* form */}
            <Formik
              initialValues={{
                bidAmount: "",
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
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="bidAmount"
                    placeholder="e.g 1000"
                    component={Input}
                  />
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="phone"
                    placeholder="e.g 2547XXXXXXXX"
                    component={Input}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    style = {{ backgroundColor:'#f79224',color:'#fff' }}
                    fullWidth
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
