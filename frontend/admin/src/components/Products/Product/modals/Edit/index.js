import React, { useRef } from "react";
import { decode } from "html-entities";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useSelector } from "react-redux";
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
import useStyles from "./styles";
import { updateProduct, getProducts } from "src/actions/products";

const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

const Edit = ({ product, toggle, imgPrev, setImgPrev, imgObj, dispatch }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const initialValues = {
    name: product.name,
    brand: product.brand,
    cost: product.cost,
    category: product.category,
    productimg: imgObj,
  };

  const { status, categories, loading, err } = useSelector(
    (state) => state.app
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

  const prodUpdateSchema = Yup.object().shape({
    name: Yup.string().required("Name of the product is required"),
    brand: Yup.string().required("Brand of the product is required"),
    cost: Yup.number().required("Price of the product is required").integer(),
    category: Yup.mixed()
      .required("Provide category of the item")
      .oneOf(categoriesIds, "Choose from the given categories"),
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
        value={categories.filter((category) => category._id === value)[0]}
        options={categories}
        disableClearable
        getOptionLabel={(option) => decode(option.name)}
        onChange={(event, newValue) => {
          form.setFieldValue(name, newValue._id, false);
          // setCategoryVal(newValue);
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
    <Container maxWidth="sm">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const changedValues = getChangedValues(values, initialValues);

          if (Object.keys(changedValues).length === 0)
            return actions.setSubmitting(false);
          let formData = new FormData();
          for (let key in changedValues) {
            formData.append(key, changedValues[key]);
          }
          (async () => dispatch(updateProduct(product._id, formData)))().then(
            () => dispatch(getProducts())
          );
          actions.setSubmitting(loading);
        }}
        validationSchema={prodUpdateSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} noValidate autoComplete="off">
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
              helperText={"upload an image file"}
              component={FileInputField}
            />

            <Box
              sx={{
                py: 2,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={toggle}
              >
                CLOSE
              </Button>
              <Button
                color="primary"
                disabled={props.isSubmitting}
                size="large"
                type="submit"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Save changes"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Edit;
