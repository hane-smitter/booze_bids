import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Alert,
  Stack,
  TextField,
  Link,
  Typography,
  CircularProgress,
} from "@mui/material";

import { unsetErr, unsetStatus } from "src/actions/errors";
import { resetPassword } from "src/actions/auth";
import ShowFeedback from "src/utils/ShowFeedback";
import useShowFeedback from 'src/utils/ShowFeedback/useShowFeedback';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const { status, err, loading } = useSelector((state) => state.app);
  const [formAlert, setFormAlert] = useState(false);
  const { alertOpen, msg, errAlertOpen, errMsg, severity, close } =
    useShowFeedback();
  let count = 0;

  useEffect(() => {
    return () => {
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
    password: "",
    passwordConfirmation: ""
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().max(255).required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <>
      <Helmet>
        <title>ResetPassword | BidsPesa</title>
      </Helmet>
      <ShowFeedback
        alertOpen={alertOpen}
        close={close}
        severity={severity}
        msg={msg}
      />
      {errMsg.map((error) => (
        <ShowFeedback
          key={++count}
          alertOpen={errAlertOpen}
          close={close}
          severity={severity}
          msg={error.msg}
          title="Ooops!"
        />
      ))}
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              dispatch(resetPassword(resetToken, values));
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
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" gutterBottom variant="h2">
                    Reset Password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Start using a new password
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
                  {status?.info?.code === "passwordreset" && (<Link
                    component={RouterLink}
                    to="/login"
                    variant="body1"
                    underline="hover"
                  >
                    Sign in
                  </Link>)}
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Enter new Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                 <TextField
                  error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                  fullWidth
                  helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                  label="Confirm new password"
                  margin="normal"
                  name="passwordConfirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.passwordConfirmation}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Change password"
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default ResetPassword;
