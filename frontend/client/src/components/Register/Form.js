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
  CardContent,
  CardActionArea,
  CardHeader,
  Card,
} from "@material-ui/core";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageIcon from "@material-ui/icons/Image";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";

import { unsetErr, unsetStatus } from "../../actions/errors";
import ShowFeedback from "../utils/ShowFeedback";

import useStyles from "./styles.js";
import { createUser } from "../../actions/users.js";
import { useLocation } from "react-router";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    err,
    loading,
    status,
  } = useSelector((state) => state.app);

  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err.length > 0));
  const locationRouter = useLocation();

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

  let formFields = [
    "phone",
    "lastname",
    "othername",
    "location",
    "password",
    "passwordConfirmation"
  ];
  let formErrors = [];
  let formErrorsName = [];
  formErrors =
    err.length && err.filter((error) => formFields.includes(error.param));
  formErrors.length &&
    formErrors.map((error) => formErrorsName.push(error.param));

  const makeUserSchema = Yup.object().shape({
    phone: Yup.number()
      .required("Phone No. is required")
      .positive("Invalid Phone Number")
      .integer(),
    othername: Yup.string()
        .required("Your othername(s) is required"),
    lastname: Yup.string()
      .required("Your surname is required"),
    location: Yup.string()
      .required(
          "Your location(e.g nearest town) is required"
        ),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
           .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
        fullWidth
        {...others}
      />
    );
  };

  useEffect(() => {
    window.shouldClearForm && delete window.shouldClearForm;
  }, []);

  useEffect(() => {
    if (window.shouldClearForm) {
      window.shouldClearForm();
      delete window.shouldClearForm;
    }
  }, [status, dispatch]);
  return (
    <Box >
        
      <Card className={classes.lightBox}>
        <Typography
        align="center"
          variant="h5"
        >Register now
        </Typography>
        <CardActionArea>
          <CardContent >
            <Formik
              enableReinitialize={true}
              initialValues={{               
                phone: "",
                othername: "",
                lastname: "",
                location: "",
                password: "",
                passwordConfirmation:""
              }}
              onSubmit={function (values, actions) {
                function shouldClearForm() {
                    actions.resetForm();
                }
                dispatch(createUser(values))
                window.shouldClearForm = shouldClearForm;
                
                
              }}
              validationSchema={makeUserSchema}
            >
              {(props) => (
                <form
                  onSubmit={props.handleSubmit}
                  autoComplete="off"
                  noValidate
                >
                    <>
                    
                    <Field
                    name="lastname"
                    label="Surname name"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    style={{ marginTop:0 }}
                    />
                    <Field
                    name="othername"
                    label="Other name"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    style={{ marginTop:0 }}
                    />
                    <Field
                    name="location"
                    label="Your location"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    style={{ marginTop:0 }}
                    />
                </>
                  
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="phone"
                    label="Phone number"
                    component={Input}
                    style={{ marginTop:0 }}
                  />
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="password"
                    label="Password"
                    component={Input}
                    type="password"
                    style={{ marginTop:0 }}
                  />
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="passwordConfirmation"
                    label="Confirm Password"
                    component={Input}
                    type="password"
                    style={{ marginTop:0 }}
                  />

                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Register"
                    )}
                  </Button>
                    <Alert severity={"info"} sx={{ width: "100%" }}>
                    <AlertTitle>Note</AlertTitle>
                    By clicking register, you consent to provide your information to us.
                    </Alert>
                </form>
              )}
            </Formik>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Form;