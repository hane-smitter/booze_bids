import React, { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Card,
  CardHeader,
  Container,
  Grid,
  Box,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useLocation } from "react-router";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles.js";
import { makeBid } from "../../../../actions/products";
import defaultImg from "../../../../images/products/defaultImg.jpeg";
import { unsetErr } from "../../../../actions/errors";
import FutureTimeCalc from "../../FutureTimeCalc";

const Detail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { product } = location.state;
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
      className={classes.rootTextField}
      fullWidth
      {...others}
    />
  );

  useEffect(() => {
    return () => {
      dispatch(unsetErr());
    };
  }, []);

  return (
    <>
      <Container maxwidth="sm">
        <Grid container>
          <Grid item xs={12} md={6} className={classes.flex}>
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
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="p"
                      // className={classes.warning}
                    >
                      {`Ends in: ${FutureTimeCalc()(
                        product.startTime,
                        product.endTime
                      )}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      RRP: KSH {product.product.cost}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className={classes.flex}>
            <Box className={classes.darkBox}>
              <Typography gutterBottom variant="h5">
                Brand : <b>{product.product.brand}</b>
              </Typography>
              <Typography variant="body2" color="inherit" component="p">
                Place your bid Bid costs only {product.bidPrice}/= Enter your
                lowest unique bid amount and phone number then standby to pay
                via Mpesa
              </Typography>

              <Formik
                initialValues={{
                  bidAmount: "",
                  phone: "",
                  bidPrice: product.bidPrice,
                  productId: product.product._id,
                }}
                onSubmit={function (values, actions) {
                  let currentCard = document.querySelector(
                    `#bid4m-${product._id}`
                  );

                  currentCard.dataset.id === product._id &&
                    setNowLoading(loading);

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
                  <form
                    onSubmit={props.handleSubmit}
                    id={"bid4m-" + product._id}
                    autoComplete="off"
                    noValidate
                    data-id={product._id}
                  >
                    <Field
                      formErrors={formErrors}
                      formErrorsName={formErrorsName}
                      name="bidAmount"
                      placeholder="for example 237"
                      component={Input}
                    />
                    <Field
                      formErrors={formErrors}
                      formErrorsName={formErrorsName}
                      name="phone"
                      placeholder="Your phone number"
                      component={Input}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {nowLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        "Place your bid"
                      )}
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Detail;
