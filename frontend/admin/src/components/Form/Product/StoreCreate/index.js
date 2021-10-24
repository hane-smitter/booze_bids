import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import {
    Box,
    Button,
    TextField,
    Container,
    Typography,
    CircularProgress
} from '@mui/material';

import { createStore } from "src/actions/stores";
import { unsetErr } from "src/actions/errors";
import ShowFeedback from "src/utils/ShowFeedback";
import useShowFeedback from "src/utils/ShowFeedback/useShowFeedback";

const ProductCategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, err } = useSelector((state) => state.app);

  React.useEffect(() => {
    return function () {
      dispatch(unsetErr());
    };
  }, []);

  let formFields = ["name", "type", "contact", "mpesaType", "mpesaAccountNo", "mpesaNumber", "location", "latitude", "longitude", "description"];
  let formErrors = [];
  let formErrorsNames = [];

  if (err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if (formErrors.length > 0)
    formErrors.map((error) => formErrorsNames.push(error.param));

  const storeCreationSchema = Yup.object().shape({
    name: Yup.string().required(
      'Provide name of the store'
    ),
    description: Yup.string(),
    type: Yup.string().required(
      'Provide type of the store'
    ), 
    contact: Yup.string().required(
      'Provide contact of the store'
    ), 
    mpesaType: Yup.string().required(
      'Provide MPESA number type e.g Paybill or Till'
    ), 
    mpesaAccountNo: Yup.string().required(
      'Provide mpesa account number for paybill only'
    ), 
    mpesaNumber: Yup.string().required(
      'Provide paybill/till number'
    ), 
    location: Yup.string().required(
      'Provide location of the store'
    ),
  });

  const { alertOpen, msg, errAlertOpen, errMsg, severity, close } =
    useShowFeedback();
  let count = 0;

  const Input = ({
      form,
      field: { value, name },
      formErrors = [],
      formErrorsNames = [],
      ...others
  }) => {
    const currentError = (form.errors[name]) || (formErrors[formErrorsNames.indexOf(name)]?.msg);
    const toShowError = Boolean( (currentError && form.touched[name]) || formErrorsNames.indexOf(name) !== -1 );
      return (
          <TextField
            margin="normal"
            name={name}
            value={value}
            onChange={(event) => form.setFieldValue(name, event.target.value, false)}
            error={toShowError}
            helperText={toShowError ? currentError : undefined}
            fullWidth
            {...others}
          />
      )
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>Create Product Category | Bidspesa</title>
      </Helmet>
      <Container maxWidth="sm">
      <ShowFeedback
        alertOpen={alertOpen}
        close={close}
        severity={severity}
        msg={msg}
      />
      {errMsg.map((error) => (
        <ShowFeedback
          key={++count}
          alertOpen={errAlertOpen}
          close={close}
          severity={severity}
          msg={error.msg}
          title="Ooops!"
        />
      ))}
        <Formik
          initialValues={{
            name: '', 
            type: '', 
            contact: '',
            mpesaType: '',
            mpesaAccountNo: '',
            mpesaNumber: '',
            location: '', 
            latitude: '', 
            longitude: '', 
            description: '', 
          }}
          onSubmit={(values, actions) => {
            dispatch(createStore(values));
            actions.setSubmitting(loading);
            /* console.log("form values");
            console.log(values);
            actions.setSubmitting(false); */
          }}
          validationSchema={storeCreationSchema}
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
                <Typography color="textPrimary" variant="h3">
                  Add Store
                </Typography>
              </Box>

              <Field name={"name"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type store name" component={Input} />
              <Field name={"type"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type store type" component={Input} />
              <Field name={"contact"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type store contact" component={Input} />
              <Field name={"mpesaType"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type mpesa number type e.g Paybil/Till" component={Input} />
              <Field name={"mpesaAccountNo"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type mpesa account no. (for paybill)" component={Input} />
              <Field name={"mpesaNumber"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type mpesa till/paybill" component={Input} />
              <Field name={"location"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type store location" component={Input} />
              <Field name={"description"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type store description" component={Input} />

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
                    "Add now"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default ProductCategoryCreate;
