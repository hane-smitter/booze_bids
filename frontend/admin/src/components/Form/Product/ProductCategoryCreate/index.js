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

import { createProductCategory } from "src/actions/products";
import { unsetErr } from "src/actions/errors";

const ProductCategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, err } = useSelector((state) => state.app);

  React.useEffect(() => {
    return function () {
      dispatch(unsetErr());
    };
  }, []);

  let formFields = ["name", "description"];
  let formErrors = [];
  let formErrorsNames = [];

  if (err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if (formErrors.length > 0)
    formErrors.map((error) => formErrorsNames.push(error.param));

  const catCreationSchema = Yup.object().shape({
    name: Yup.string().required(
      'Provide name of category e.g "ELECTRONICS"'
    ),
    description: Yup.string(),
  });

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
        <title>Create Product Category | Booze Bids</title>
      </Helmet>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={(values, actions) => {
            dispatch(createProductCategory(values));
            actions.setSubmitting(loading);
            /* console.log("form values");
            console.log(values);
            actions.setSubmitting(false); */
          }}
          validationSchema={catCreationSchema}
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
                  Add Product Category
                </Typography>
              </Box>

              <Field name={"name"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type category name" component={Input} />
              <Field name={"description"} formErrors={formErrors} formErrorsNames={formErrorsNames} label="Type category description" component={Input} />

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
