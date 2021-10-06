import { decode } from "html-entities";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCategory, getCategories } from "src/actions/products";

const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

const Edit = ({
  categories = [],
  currentCatIdSelected,
  toggle,
  dispatch
}) => {
  const { loading, err } = useSelector((state) => state.app);

  let categoryId = currentCatIdSelected;
  if (!categoryId) return null;
  let category = categories.filter(
    (category) => category._id === categoryId
  )[0];

  const initialValues = {
    id: category._id,
    name: category.name,
    description: category.description,
  }

  category.name = decode(category.name);
  category.description = decode(category.description);

  let formFields = ["name", "description"];
  let formErrors = [];
  let formErrorsNames = [];

  if (err.length > 0) {
    formErrors = err.filter((error) => formFields.includes(error.param));
  }
  if (formErrors.length > 0)
    formErrors.map((error) => formErrorsNames.push(error.param));

  const catCreationSchema = Yup.object().shape({
    name: Yup.string().required('Provide name of category e.g "ELECTRONICS"'),
    description: Yup.string(),
  });

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
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const changedValues = getChangedValues(values, initialValues);
        if (Object.keys(changedValues).length === 0)
            return actions.setSubmitting(false);

        (async () => dispatch(updateProductCategory(values.id, changedValues)))().then(
          () => dispatch(getCategories())
        );
        actions.setSubmitting(loading);
      }}
      validationSchema={catCreationSchema}
      enableReinitialize={true}
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
            <Typography color="textPrimary" variant="h3">
              Modify {category.name}
            </Typography>
          </Box>

          <Field
            name={"name"}
            formErrors={formErrors}
            formErrorsNames={formErrorsNames}
            label="Type category name"
            component={Input}
          />
          <Field
            name={"description"}
            formErrors={formErrors}
            formErrorsNames={formErrorsNames}
            label="Type category description"
            component={Input}
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
              Close
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
  );
};

export default Edit;
