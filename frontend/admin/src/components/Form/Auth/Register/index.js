import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  Alert,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { register } from "src/actions/auth";
import { unsetErr, unsetStatus } from "src/actions/errors";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, err, loading } = useSelector((state) => state.app);
  const [formAlert, setFormAlert] = useState(false);

  useEffect(() => {
    return () => {
      console.log("dispatch unset in register clean up");
      batch(() => {
        dispatch(unsetErr());
        dispatch(unsetStatus());
      });
    };
  }, []);
  useEffect(() => {
    if (status?.info?.severity) {
      setFormAlert(true);
    }
  }, [status]);
  useEffect(() => {
    if (err.length > 0) {
      setFormAlert(true);
    }
  }, [err]);

  //form control
  const initialValues = {
    role: "Admin",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirmation: "",
    policy: true,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    firstname: Yup.string().max(255).required("First name is required"),
    lastname: Yup.string().max(255).required("Last name is required"),
    password: Yup.string().max(255).required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    // policy: Yup.boolean().oneOf([true], "This field must be checked"),
  });

  return (
    <>
      <Helmet>
        <title>Register | BidsPesa</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          // height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              dispatch(register(values));

              let timeout;
              if (status?.info?.severity === "success") {
                if (timeout) clearTimeout();
                timeout = setTimeout(() => {
                  navigate("/app/dashboard", { replace: true });
                }, 3000);
              }
              actions.setSubmitting(loading);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{
                      my: 3,
                      display: "grid",
                      gridAutoFlow: "column", }}>
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
                  <Typography color="textPrimary" variant="h2">
                    Create Admin account
                  </Typography>
                </Box>
                {(Boolean(status?.info?.message) && formAlert) && (
                  <Box sx={{ width: "100%", paddingInline: "10px" }}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity={status.info.severity} onClose={() => setFormAlert(false)}>{status.info.message}</Alert>
                    </Stack>
                  </Box>
                )}
                {(err.length > 0 && formAlert) &&
                  err.map((error) => (
                    <Box sx={{ width: "100%", paddingInline: "10px" }}>
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error" onClose={() => setFormAlert(false)}>
                          {error.msg}
                        </Alert>
                      </Stack>
                    </Box>
                  ))}
                <TextField
                  error={Boolean(touched.firstname && errors.firstname)}
                  fullWidth
                  helperText={touched.firstname && errors.firstname}
                  label="First name"
                  margin="normal"
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastname && errors.lastname)}
                  fullWidth
                  helperText={touched.lastname && errors.lastname}
                  label="Last name"
                  margin="normal"
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    touched.passwordConfirmation && errors.passwordConfirmation
                  )}
                  fullWidth
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  label="Confirm Password"
                  margin="normal"
                  name="passwordConfirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.passwordConfirmation}
                  variant="outlined"
                />
                {/* <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{" "}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box> */}
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                {/* <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                    underline="hover"
                  >
                    Sign in
                  </Link>
                </Typography> */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
