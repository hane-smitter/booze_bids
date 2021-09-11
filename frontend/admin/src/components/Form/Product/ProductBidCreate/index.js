import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  InputAdornment,
  Box,
  TextField,
  Typography,
  Button,
  Container,
  CircularProgress
} from "@material-ui/core";

import useStyles from "./styles";
import { createProductBid } from "src/actions/products";
import { unsetErr } from 'src/actions/errors';

const ProductBidCreate = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { err, loading } = useSelector((state) => state.app);
  let formFields = ['bidPrice', 'targetAmount', 'startTime', 'endTime'];
  let formErrors = [];
  let formErrors2 = [];
  if(err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if(formErrors.length > 0)
    formErrors.map(error => formErrors2.push(error.param));

    useEffect(() => {
        return () => {
            dispatch(unsetErr());
        }
    }, []);

  /* console.log(location.state);
  console.log('formErrors');
  console.log(formErrors);
  console.log('formErrors2');
  console.log(formErrors2); */

  const bidCreationSchema = Yup.object().shape({
    bidPrice: Yup.number()
      .required("Bidding price is a required field")
      .positive("This price is not allowed")
      .integer(),
    targetAmount: Yup.number()
      .required("Target amount is a required field")
      .positive("This amount is not allowed")
      .integer(),
    startTime: Yup.date().default(() => new Date()),
    endTime: Yup.date().required("Bid expiry date is required"),
  });

  return (
    <>
      <Helmet>
        <title>Create Product Bid | Booze Bids</title>
      </Helmet>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            bidPrice: "",
            targetAmount: "",
            startTime: "",
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
                  Create Bid for <small><i style={{ textTransform: 'capitalize' }}>{location.state.name}</i></small>
                </Typography>
              </Box>
              <TextField
                error={Boolean((props.touched.bidPrice && props.errors.bidPrice) || (formErrors2.indexOf("bidPrice") !== -1))}
                fullWidth
                helperText={(props.touched.bidPrice && props.errors.bidPrice) || (formErrors2.indexOf("bidPrice") !== -1 && formErrors[formErrors2.indexOf("bidPrice")].msg)}
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
                  (props.touched.targetAmount && props.errors.targetAmount) || (formErrors2.indexOf("targetAmount") !== -1)
                )}
                fullWidth
                helperText={
                  (props.touched.targetAmount && props.errors.targetAmount) || (formErrors2.indexOf("targetAmount") !== -1 && formErrors[formErrors2.indexOf("targetAmount")].msg)
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
              <TextField
                error={Boolean(
                  (props.touched.startTime && props.errors.startTime) || (formErrors2.indexOf("startTime") !== -1)
                )}
                fullWidth
                helperText={
                    (props.touched.startTime && props.errors.startTime) || (formErrors2.indexOf("startTime") !== -1 && formErrors[formErrors2.indexOf("startTime")].msg)
                }
                label="Bid STARTING time"
                margin="normal"
                name="startTime"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.startTime}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                    (props.touched.endTime && props.errors.endTime) || (formErrors2.indexOf("endTime") !== -1)
                )}
                fullWidth
                helperText={
                    (props.touched.endTime && props.errors.endTime) || (formErrors2.indexOf("endTime") !== -1 && formErrors[formErrors2.indexOf("endTime")].msg)
                }
                label="Bid ENDING time"
                margin="normal"
                name="endTime"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.endTime}
                variant="outlined"
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
                  {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Create bid now' }
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