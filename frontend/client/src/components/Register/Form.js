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
  Link,
} from "@material-ui/core";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageIcon from "@material-ui/icons/Image";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";

import { unsetErr, unsetStatus } from "../../actions/errors";
import ShowFeedback from "../utils/ShowFeedback";

import useStyles from "./styles.js";
import { createUser, sendOtp } from "../../actions/users.js";
import { useLocation } from "react-router";
import { array } from "yup/lib/locale";
import { useHistory } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    err,
    loading,
    status,
  } = useSelector((state) => state.app);

  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [showBtn, setVerify] = useState(false);
  const [idCode, setCode] = useState('3902');
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err.length > 0));
  const locationRouter = useLocation();
  const history = useHistory();

  //show rest of form for otp ver
  const handleSetVerify = () => {
    // dispatch(sendOtp(formFields, history));
      setVerify(true);
  };
  //submit
  const submitForm = (values,history) => {
    if(showBtn){
      handleSetVerify()
      dispatch(createUser(values, history)) 
    }
    else {
      handleSetVerify()
      dispatch(sendOtp(values, history)) 
    }
  }
  const genId = () => {
    setCode(Math.floor(
      Math.random() * (9999 - 1111) + 1111
    ))
  }
  const handleUnSetVerify = () => {
    setVerify(false);
  };

  const useGeoLocation = () => {
      const [location, setLocation] = useState({
          loaded: false,
          coordinates: { lat: "", lng: "" },
      });

      const onSuccess = (location) => {
          setLocation({
              loaded: true,
              coordinates: {
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
              },
          });
      };

      const onError = (error) => {
          setLocation({
              loaded: true,
              coordinates: {
                  lat: "",
                  lng: "",
              },
              error: {
                  code: error.code,
                  message: error.message,
              },
          });
      };

      useEffect(() => {
          if (!("geolocation" in navigator)) {
              onError({
                  code: 0,
                  message: "Geolocation not supported",
              });
          }

          navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }, []);

      return location;
  };
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
  console.log(showBtn)
  let formFields = [
    "phone",
    "surname",
    "othername",
    "location",
    "latitude",
    "longitude",
    "password",
    "passwordConfirmation",
    "otp",
    "id",
    "consent"
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
        .required("Your Second Name is required"),
    surname: Yup.string()
      .required("Your First Name is required"),
    otp: Yup.string()
      .oneOf([idCode, null], 'Incorrect validation code'),
    // location: Yup.string()
    //   .required(
    //       "Your location(e.g nearest town) is required"
    //     ),
    consent: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
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
        <Typography 
        className={classes.title}
          align="center"
          variant="h5">
            Welcome to Bidspesa
          </Typography>
          <Typography 
          style={{ textTransform:'uppercase',textAlign:'center',fontSize:'14px' }}
          variant="h6">
            {showBtn ?
              <span>
                <span style={{ color:'#666' }}>Step 1</span>&nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <span>&nbsp;|&nbsp;</span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <span className={classes.step}>Step 2</span>
              </span>
              :
              <span>
                <span className={classes.step}>Step 1</span>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color:'#666' }}>Step 2</span>
              </span>
            }
          </Typography>
          <Typography 
          style={{ textTransform:'uppercase', textAlign:'center',fontSize:'12px',marginBottom:10 }}
          variant="h6">
              <span>
                Register Account
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              &nbsp;&nbsp;
                Verify Account
              </span>
          </Typography>
      <Card className={classes.lightBox}>
        {/* <Typography
        align="center"
          variant="h6"
        >Register now
        </Typography> */}
        <Typography
        align="center"
        variant="h6"
        style={{ fontWeight: 300,fontSize: '14px',padding:'30px'}}>
          Thanks for your interest in BidsPesa! Once you fill in the registration form below, you will receive the registration code via SMS. To complete the registration process, please submit the registration code.
        </Typography>
        <Typography
        align="center"
        variant="h6"
        style={{ fontWeight: 300,fontSize: '14px',padding:'30px'}}>
          Already got a<b> Registration code?</b> <Link onClick={handleSetVerify}>Skip this step ›</Link>
        </Typography>

        <CardActionArea>
          <CardContent >
            <Formik
              enableReinitialize={true}
              initialValues={{               
                phone: "",
                othername: "",
                surname: "",
                location: "",
                latitude: useGeoLocation().coordinates.lat,
                longitude: useGeoLocation().coordinates.lng,
                password: "",
                passwordConfirmation:"",
                id:idCode,
                otp:"",
                consent:false
              }}
              onSubmit={function (values, actions) {
                function shouldClearForm() {
                    actions.resetForm();
                }
                submitForm(values, history)
                window.shouldClearForm = shouldClearForm;
                
                
              }}
              validationSchema={showBtn ? makeUserSchema : ''}
              
            >
              {(props) => (
                <form
                  onSubmit={props.handleSubmit}
                  autoComplete="off"
                  noValidate
                >
                    <>
                    <span hidden={showBtn}>
                    <label className={classes.label}>Firstname*</label>
                    <Field
                    name="surname"
                    placeholder="First Name"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    style={{ marginTop:2,marginBottom:15 }}
                    size="small"
                    />
                    <label className={classes.label}>Second Name*</label>
                    <Field
                    name="othername"
                    placeholder="Second name"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    style={{ marginTop:2,marginBottom:15 }}
                    size="small"
                    />
                    {/* <Field
                    name="location"
                    label="Your location"
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    component={Input}
                    style={{ marginTop:0 }}
                    /> */}
                
                  <label className={classes.label}>Mobile Phone Number*</label>
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="phone"
                    placeholder="Phone 254XXXXXXXXX"
                    component={Input}
                    style={{ marginTop:2,marginBottom:15 }}
                    type="text"
                    size="small"
                  />
                  </span>
                  <span hidden={!showBtn}>
                  <label className={classes.label}>Registration Code*</label>
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="otp"
                    placeholder="Verification Code"
                    component={Input}
                    type="number"
                    style={{ marginTop:2,marginBottom:15 }}
                    size="small"
                  />
                  <label className={classes.label}>Password*</label>
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="password"
                    placeholder="Password"
                    component={Input}
                    type="password"
                    style={{ marginTop:2,marginBottom:15 }}
                    size="small"
                  />
                  <label className={classes.label}>Confirm Password*</label>
                  <Field
                    formErrors={formErrors}
                    formErrorsName={formErrorsName}
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    component={Input}
                    type="password"
                    style={{ marginTop:2,marginBottom:15 }}
                    size="small"
                  />
                
                  <Button  onClick={handleUnSetVerify} type="button" variant="contained" color="secondary">
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "< Back"
                    )}
                  </Button>
                  <Button style={{ float:'right' }} type="submit" variant="contained" color="primary">
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "COMPLETE >"
                    )}
                  </Button>
                  </span>
                  <span hidden={showBtn}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "GET VERIFICATION CODE >"
                    )}
                  </Button>
                  </span>
                  </>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: 450,fontSize: '14px', paddingTop:'5px'}}>
                    <Field formErrors={formErrors}
                    formErrorsName={formErrorsName} type="checkbox" name="consent"/>
                    By checking this message, I hereby confirm that I agree with the <Link>Terms and Conditions</Link>, the <Link>Privacy Policy</Link>, that I am 18 years old or over and that all information given is true.
                    </Typography>
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
