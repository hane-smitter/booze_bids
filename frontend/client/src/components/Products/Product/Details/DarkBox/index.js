import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Divider,
  ListItem,
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  Snackbar,
} from "@material-ui/core";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageIcon from "@material-ui/icons/Image";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";

import { makeBid, fetchTopBidder } from "../../../../../actions/products";
import useStyles from "./styles.js";

const DarkBox = ({ product, updateProducts }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    err,
    loading,
    status,
    bidder: { topBidder },
  } = useSelector((state) => state.app);
  let newBidder = Boolean(status?.info?.code === "newbiddinguser");

  if (newBidder) window.scroll({ top: 2, left: 0, behavior: "smooth" });

  let formFields = [
    "bidAmount",
    "bidder.phone",
    "bidder.lastname",
    "bidder.firstname",
    "bidder.location",
  ];
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
  }) => {
    return (
      <TextField
        name={name}
        value={value}
        error={
          (getIn(form.touched, name) && !!getIn(form.errors, name)) ||
          formErrorsName.indexOf(name) !== -1
        }
        helperText={
          (getIn(form.touched, name) && getIn(form.errors, name)) ||
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
  };

  useEffect(() => {
    dispatch(fetchTopBidder());
    window.shouldClearForm && delete window.shouldClearForm;
  }, []);

  useEffect(() => {
    if (window.shouldClearForm) {
      window.shouldClearForm(newBidder);
      delete window.shouldClearForm;
    }
  }, [status, dispatch]);
  return (
    <Box className={classes.darkBox}>
      <Typography gutterBottom variant="h5">
        Highest Bidder
      </Typography>
      {/*highest bidder  details*/}
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={topBidder.bidder?.bidderuser[0]?.fullname ?? "__"}
          />
          <ListItemText
            primary={`KES ${topBidder?.bidder?.bidAmountTotal ?? 0}`}
          />
        </ListItem>
      </List>
      <Divider color="grey" />
      <Typography gutterBottom variant="h5">
        <b>{product.product.brand}</b>
      </Typography>
      <Typography gutterBottom variant="body2" color="inherit" component="p">
        Place your bid Bid. Minimum Bid amount is {product.bidPrice}
        /= . Enter phone number then standby to pay via Mpesa
      </Typography>

      <Formik
        enableReinitialize={true}
        initialValues={{
          bidAmount: product.bidPrice,
          bidder: {
            phone: "",
            acknowledgeNew: newBidder,
            firstname: "",
            lastname: "",
            location: "",
          },
          bidPrice: product.bidPrice,
          productId: product.product._id,
        }}
        onSubmit={function (values, actions) {
          function shouldClearForm(newBidder = false) {
            if (newBidder) {
              actions.resetForm({ values: values });
            } else {
              actions.resetForm();
            }
          }
          let currentCard = document.querySelector(`#bid4m-${product._id}`);
          currentCard.dataset.id === product._id &&
            batch(() => {
              dispatch(makeBid(values));
              updateProducts();
              dispatch(fetchTopBidder());
            });
          window.shouldClearForm = shouldClearForm;
          if (newBidder) {
            actions.resetForm();
          }
          // actions.resetForm();

          // newBidder && actions.resetForm({ values });
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
            {newBidder ? (
              <>
                <Alert severity={"info"} sx={{ width: "100%" }}>
                  <AlertTitle>Hello there</AlertTitle>
                  Chances are this could be your first bid. Just a little
                  more information and get your bid going.
                </Alert>
                <Field
                  name="bidder.lastname"
                  label="surname name"
                  formErrors={formErrors}
                  formErrorsName={formErrorsName}
                  component={Input}
                />
                <Field
                  name="bidder.firstname"
                  label="other name"
                  formErrors={formErrors}
                  formErrorsName={formErrorsName}
                  component={Input}
                />
                <Field
                  name="bidder.location"
                  label="Your location"
                  formErrors={formErrors}
                  formErrorsName={formErrorsName}
                  component={Input}
                />
              </>
            ) : null}
            <Field
              formErrors={formErrors}
              formErrorsName={formErrorsName}
              name="bidAmount"
              label="Bid amount"
              placeholder="for example 237"
              inputProps={{ min: product.bidPrice }}
              type="number"
              component={Input}
            />
            <Field
              formErrors={formErrors}
              formErrorsName={formErrorsName}
              name="bidder.phone"
              label="Phone number"
              component={Input}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              {loading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Place your bid"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DarkBox;