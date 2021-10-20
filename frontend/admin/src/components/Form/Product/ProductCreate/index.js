import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Button,
  Box,
  Typography,
  FormHelperText,
  TextField,
  Container,
  CircularProgress,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router";
import { decode } from "html-entities";

import useStyles from "./styles";
import { createProduct, getProducts } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import ShowFeedback from "src/utils/ShowFeedback";

const Form = () => {
  const { categories, err, loading, status } = useSelector(
    (state) => state.app
  );
  const normalizedCats = useMemo(() => categories, [categories]);
  /* const initialValues = {
    name: "",
    brand: "",
    cost: "",
    category: normalizedCats[0]._id, 
    productimg: "",
  }; */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [imgPrev, setImgPrev] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    brand: "",
    cost: "",
    category: "",
    productimg: "",
  });
  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err.length > 0));
  const categoriesIds =
    normalizedCats.length > 0
      ? normalizedCats.map((category) => category._id)
      : [];
  let formFields = ["name", "brand", "cost", "category", "productimg"];
  let formErrors = [];
  let formErrorsNames = [];
  //hidden file input
  const hiddenInp = useRef(null);

  useEffect(() => {
    if (normalizedCats.length > 0) {
      const finalVal = Object.assign({}, initialValues, {
        category: normalizedCats[0]._id,
      });
      setInitialValues(finalVal);
    }
  }, [normalizedCats]);

  if (err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if (formErrors.length > 0)
    formErrors.map((error) => formErrorsNames.push(error.param));

  useEffect(() => {
    dispatch(getProducts());
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

  const prodCreationSchema = Yup.object().shape({
    name: Yup.string().required("Name of the product is required"),
    brand: Yup.string().required("Brand of the product is required"),
    cost: Yup.number().required("Price of the product is required").integer(),
    category: Yup.mixed()
      .required("Provide category of the item")
      .oneOf(categoriesIds, "Choose from the displayed categories"),
    productimg: Yup.mixed().required("Image of the product is required"),
  });

  //form inputs coponents
  const AutoCompleteField = ({
    form,
    field: { value, name },
    categories = [],
    formErrors,
    formErrorsNames,
    ...others
  }) => {
    const currentError =
      form.errors[name] || formErrors[formErrorsNames.indexOf(name)]?.msg;
    const toShowError = Boolean(
      (currentError && form.touched[name]) ||
        formErrorsNames.indexOf(name) !== -1
    );
    return (
      <Autocomplete
        value={
          categories.filter((category) => category._id === value)[0] ??
          initialValues
        }
        options={categories}
        // disableClearable
        getOptionLabel={(option) => decode(option.name)}
        onChange={(event, newValue) => {
          if (newValue) form.setFieldValue(name, newValue._id, false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={toShowError}
            margin="normal"
            helperText={
              toShowError ? currentError ?? params.helperText : undefined
            }
            name={name}
            label="Pick Category"
          />
        )}
      />
    );
  };

  const CustomFileInput = ({
    name,
    value,
    form,
    helperText = "pick an image...",
    formErrors,
    formErrorsNames,
    ...others
  }) => {
    const currentError =
      form.errors[name] || formErrors[formErrorsNames.indexOf(name)]?.msg;
    const toShowError = Boolean(
      (currentError && form.touched[name]) ||
        formErrorsNames.indexOf(name) !== -1
    );
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          className={`${classes.button} ${classes.btnUpload}`}
          startIcon={<Image />}
          onClick={() => hiddenInp.current.click()}
          sx={{
            mt: 2,
            mb: 0.5,
          }}
        >
          choose image
        </Button>
        <FormHelperText error={toShowError}>
          {toShowError ? currentError : value?.name ?? helperText}
        </FormHelperText>
        {imgPrev && (
          <img src={imgPrev} alt="preview" width={200} height={200} />
        )}
        <input
          id="file"
          accept="image/*"
          name={name}
          type="file"
          hidden
          ref={hiddenInp}
          onChange={(event) => {
            if (!event.currentTarget.files.length) return;

            let imgInfo = event.currentTarget.files[0];
            form.setFieldValue(name, imgInfo);

            const reader = new FileReader();
            reader.readAsDataURL(imgInfo);

            reader.onload = () => {
              setImgPrev(reader.result);
            };
          }}
          {...others}
        />
      </>
    );
  };
  const FileInputField = ({
    form,
    field: { value, name },
    formErrors,
    formErrorsNames,
    helperText,
  }) => {
    return (
      <CustomFileInput
        name={name}
        formErrors={formErrors}
        formErrorsNames={formErrorsNames}
        value={value}
        form={form}
        helperText={helperText}
      />
    );
  };

  const Input = ({
    form,
    field: { value, name },
    formErrors = [],
    formErrorsNames = [],
    ...others
  }) => {
    const currentError =
      form.errors[name] || formErrors[formErrorsNames.indexOf(name)]?.msg;
    const toShowError = Boolean(
      (currentError && form.touched[name]) ||
        formErrorsNames.indexOf(name) !== -1
    );
    return (
      <TextField
        margin="normal"
        name={name}
        value={value}
        onChange={(event) => form.setFieldValue(name, event.target.value)}
        error={toShowError}
        helperText={toShowError ? currentError : undefined}
        fullWidth
        {...others}
      />
    );
  };

  return (
    <>
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
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            let formData = new FormData();
            for (let key in values) {
              // console.log(key);
              formData.append(key, values[key]);
            }
            actions.setSubmitting(loading);
            dispatch(createProduct(formData));

            /* console.log("This is the form data from the form");
            for (var value of formData.values()) {
              console.log(value);
           }
            console.log("This is the VALUES");
            console.log(values);
            actions.setSubmitting(false); */
          }}
          validationSchema={prodCreationSchema}
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
                  Add Product
                </Typography>
              </Box>

              <Field
                name={"name"}
                formErrorsNames={formErrorsNames}
                formErrors={formErrors}
                label={"Product name"}
                component={Input}
              />
              <Field
                name={"brand"}
                formErrorsNames={formErrorsNames}
                formErrors={formErrors}
                label={"Type brand name"}
                component={Input}
              />
              <Field
                name={"cost"}
                formErrorsNames={formErrorsNames}
                formErrors={formErrors}
                label={"Type cost"}
                component={Input}
              />
              <Field
                name={"category"}
                categories={normalizedCats}
                formErrorsNames={formErrorsNames}
                formErrors={formErrors}
                label={"choose category"}
                component={AutoCompleteField}
              />
              <Field
                name={"productimg"}
                formErrorsNames={formErrorsNames}
                formErrors={formErrors}
                helperText={"hehe upload a file"}
                component={FileInputField}
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
                    "Add now"
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

export default Form;
