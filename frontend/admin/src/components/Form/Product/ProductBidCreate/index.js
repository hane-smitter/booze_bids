import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import {
  InputAdornment,
  Box,
  TextField,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

import useStyles from "./styles";
import { DatePickerField } from "../../DatePicker";
import { createProductBid } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import ShowFeedback from "src/utils/ShowFeedback";

const ProductBidCreate = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { err, loading, status } = useSelector((state) => state.app);
  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err.length > 0));

  let formFields = ["bidPrice", "targetAmount", "startTime", "endTime"];
  let formErrors = [];
  let formErrors2 = [];
  if (err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if (formErrors.length > 0)
    formErrors.map((error) => formErrors2.push(error.param));

  useEffect(() => {
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    };
  }, []);
  useEffect(() => {
    setAlertOpen(Boolean(status?.info));
  }, [status]);
  useEffect(() => {
    setErrAlertOpen(Boolean(err.length > 0));
  }, [err]);

  const bidCreationSchema = Yup.object().shape({
    bidPrice: Yup.number()
      .required("Bidding price is a required field")
      .positive("This price is not allowed")
      .integer(),
    targetAmount: Yup.number()
      .required("Target amount is a required field")
      .positive("This amount is not allowed")
      .integer(),
    startTime: Yup.date().required("Bid start date is required"),
    endTime: Yup.date().required("Bid expiry date is required"),
  });

  return (
    <>
      <Helmet>
        <title>Create Product Bid | Booze Bids</title>
      </Helmet>
      <Container maxWidth="sm">
        <ShowFeedback
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          severity={status?.info?.severity}
          msg={status?.info?.message}
        />
        {err.length > 0 &&
          err.map((error) => (
            <ShowFeedback
              alertOpen={errAlertOpen}
              setAlertOpen={setErrAlertOpen}
              severity={"error"}
              msg={error.msg}
              title="Ooops!"
            />
          ))}
        <Formik
          initialValues={{
            bidPrice: "",
            targetAmount: "",
            startTime: new Date(),
            endTime: "",
            product: location.state._id,
          }}
          onSubmit={(values, actions) => {
            dispatch(createProductBid(values));
            actions.setSubmitting(loading);
          }}
          validationSchema={bidCreationSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} noValidate autoComplete="off">
              <Box
                sx={{
                  my: 3,
                  display: "grid",
                  gridAutoFlow: "column",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    justifySelf: "start",
                  }}
                >
                  <Button variant="outlined" onClick={() => navigate(-1)}>
                    Go Back
                  </Button>
                </Box>
                <Typography color="textPrimary" variant="h2">
                  Create Bid for{" "}
                  <small>
                    <i style={{ textTransform: "capitalize" }}>
                      {location.state.name}
                    </i>
                  </small>
                </Typography>
              </Box>
              <TextField
                error={Boolean(
                  (props.touched.bidPrice && props.errors.bidPrice) ||
                    formErrors2.indexOf("bidPrice") !== -1
                )}
                fullWidth
                helperText={
                  (props.touched.bidPrice && props.errors.bidPrice) ||
                  (formErrors2.indexOf("bidPrice") !== -1 &&
                    formErrors[formErrors2.indexOf("bidPrice")].msg)
                }
                label="Bid price"
                margin="normal"
                name="bidPrice"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.bidPrice}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Kes</InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(
                  (props.touched.targetAmount && props.errors.targetAmount) ||
                    formErrors2.indexOf("targetAmount") !== -1
                )}
                fullWidth
                helperText={
                  (props.touched.targetAmount && props.errors.targetAmount) ||
                  (formErrors2.indexOf("targetAmount") !== -1 &&
                    formErrors[formErrors2.indexOf("targetAmount")].msg)
                }
                label="Target amount"
                margin="normal"
                name="targetAmount"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.targetAmount}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Kes</InputAdornment>
                  ),
                }}
              />

              <Field
                formErrors={formErrors}
                formErrors2={formErrors2}
                label="Bid STARTING time"
                name="startTime"
                disablePast
                component={DatePickerField}
              />
              <Field
                formErrors={formErrors}
                formErrors2={formErrors2}
                label="Bid EXPIRY time"
                name="endTime"
                disablePast
                component={DatePickerField}
                ampmInClock
                minDateTime={props.values.startTime}
              />

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={props.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    "Create bid now"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default ProductBidCreate;
