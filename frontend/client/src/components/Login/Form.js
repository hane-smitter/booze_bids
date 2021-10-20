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
  InputAdornment,
} from "@material-ui/core";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageIcon from "@material-ui/icons/Image";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../actions/users.js";
import { AUTH } from '../../constants';

import { unsetErr, unsetStatus } from "../../actions/errors";
import ShowFeedback from "../utils/ShowFeedback";

import useStyles from "./styles.js";
import { useLocation } from "react-router";
import { array } from "yup/lib/locale";
import { useHistory } from "react-router-dom";
import decode from 'jwt-decode';
import * as actionType from '../../constants';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LockIcon from '@mui/icons-material/Lock';

const Form = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

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
    "password",
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
    password: Yup.string().required('Password is required')
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
        <Typography 
          className={classes.title}
          align="center"
          variant="h5">
          Welcome to Bidspesa
        </Typography>
      <Card className={classes.lightBox}>
        <Typography
        align="center"
          variant="h5"
        >Login
        </Typography>
        <CardActionArea>
          <CardContent >
            <Formik
              enableReinitialize={true}
              initialValues={{               
                phone: "",
                password: "",
              }}
              onSubmit={function (values, actions) {
                function shouldClearForm() {
                    actions.resetForm();
                }
                dispatch(loginUser(values, history))
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
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="phone"
                    placeholder="Phone number"
                    component={Input}
                    style={{ marginTop:0 }}
                    type="text"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhoneIcon fontSize="small" color="primary">
                          </LocalPhoneIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="password"
                    placeholder="Password"
                    component={Input}
                    type="password"
                    style={{ marginTop:0 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" color="primary">
                          </LockIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                 
                </>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                   
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
