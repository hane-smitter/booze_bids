import React, { useEffect, useRef, useState } from "react";
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
import { FileUpload } from "@mui/icons-material";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router";

import useStyles from "./styles";
import { createProduct, getProducts } from "src/actions/products";
import { unsetErr } from "src/actions/errors";

const Form = () => {
  const initialValues = {
    name: "",
    brand: "",
    cost: "",
    category: "",
    productimg: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [imgPrev, setImgPrev] = useState(null);
  const { categories, err, loading } = useSelector((state) => state.app);
  const [categoryVal, setCategoryVal] = useState(
    categories.length > 0 ? categories[0].name : ""
  );
  const categoriesIds =
    categories.length > 0 ? categories.map((category) => category._id) : [];
  let formFields = ["name", "brand", "cost", "category", "productimg"];
  let formErrors = [];
  let formErrorsNames = [];
  //hidden file input
  const hiddenInp = useRef(null);

  if (err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if (formErrors.length > 0)
    formErrors.map((error) => formErrorsNames.push(error.param));

  useEffect(() => {
    if (categories.length < 1) dispatch(getProducts());
    return () => {
      dispatch(unsetErr());
    };
  }, []);

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
        value={categoryVal}
        options={categories}
        getOptionLabel={(option) => {
          return option.name ?? option;
        }}
        onChange={(event, newValue) => {
          form.setFieldValue(name, newValue._id, false);
          setCategoryVal(newValue.name);
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
          startIcon={<FileUpload />}
          onClick={() => hiddenInp.current.click()}
        >
          choose image
        </Button>
        <FormHelperText error={toShowError}>
          {toShowError ? currentError : value?.name ?? helperText}
        </FormHelperText>
        {imgPrev && <img src={imgPrev} width={200} height={200} />}
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
            console.log("this is the value of the image from formik");
            console.log(value);
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
  }) => {
    return (
      <CustomFileInput
        name={name}
        formErrors={formErrors}
        formErrorsNames={formErrorsNames}
        value={value}
        form={form}
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
        onChange={(event) =>
          form.setFieldValue(name, event.target.value, false)
        }
        error={toShowError}
        helperText={toShowError ? currentError : undefined}
        fullWidth
        {...others}
      />
    );
  };

  /* const onChangeFileHandler = (event) => {
    setFormval({ ...formval, productimg: event.target.files[0] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    for (let key in formval) {
      formData.append(key, formval[key]);
    }
    dispatch(createProduct(formData));
  }; */
  return (
    <>
      <Container maxWidth="sm">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            let formData = new FormData();
            for (let key in values) {
              console.log(key);
              formData.append(key, values[key]);
            }
            dispatch(createProduct(formData));
            actions.setSubmitting(loading)


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
                categories={categories}
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
                  {props.isSubmitting ? (
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
