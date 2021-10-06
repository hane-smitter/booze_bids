import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import { unsetErr, unsetStatus } from "src/actions/errors";
import { forgotPassword } from "src/actions/auth";
import ShowFeedback from "src/utils/ShowFeedback";
import useShowFeedback from "src/utils/ShowFeedback/useShowFeedback";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [formAlert, setFormAlert] = useState(false);
  const { status, err, loading } = useSelector((state) => state.app);
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
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
  });

  return (
    <>
      <Helmet>
        <title>ForgotPassword | BidsPesa</title>
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
              batch(() => {
                dispatch(unsetErr());
                dispatch(unsetStatus());
              });
              dispatch(forgotPassword(values));
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
                    Forgot Password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Please enter the email address you registered your account
                    with. We will send you reset password confirmation to this
                    email
                  </Typography>
                </Box>

                {Boolean(status?.info?.message) && formAlert && (
                  <Box sx={{ width: "100%", paddingInline: "10px" }}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert
                        severity={status.info.severity}
                        onClose={() => setFormAlert(false)}
                      >
                        {status.info.message}
                      </Alert>
                    </Stack>
                  </Box>
                )}
                {err.length > 0 &&
                  formAlert &&
                  err.map((error) => (
                    <Box sx={{ width: "100%", paddingInline: "10px" }}>
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert
                          severity="error"
                          onClose={() => setFormAlert(false)}
                        >
                          {error.msg}
                        </Alert>
                      </Stack>
                    </Box>
                  ))}

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
                      "Send Email"
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

export default ForgotPassword;
