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

import useStyles from "./styles.js";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    err,
    loading,
    status,
  } = useSelector((state) => state.app);
  
  let formFields = [
    "phone",
    "lastname",
    "firstname",
    "location",
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
    firstname: Yup.string()
        .required("Your firstname is required"),
    lastname: Yup.string()
      .required("Your surname is required"),
    location: Yup.string()
      .required(
          "Your location(e.g nearest town) is required"
        ),
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
          style={{ padding:8,margin:5}}
          variant="h5"
        >Register now
        </Typography>
        <CardActionArea>
          <CardContent>
            
            <Divider color="grey" />

            <Formik
              enableReinitialize={true}
              initialValues={{               
                phone: "",
                firstname: "",
                lastname: "",
                location: "",
              }}
              onSubmit={function (values, actions) {
                function shouldClearForm() {
                    actions.resetForm();
                }
                
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
                    label="surname name"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    />
                    <Field
                    name="firstname"
                    label="other name"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    />
                    <Field
                    name="location"
                    label="Your location"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    />
                </>
                  
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="phone"
                    label="Phone number"
                    component={Input}
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
