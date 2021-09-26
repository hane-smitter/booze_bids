import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const ShowFeedback = ({
  alertOpen,
  autoHideDuration = 6000,
  setAlertOpen,
  severity = "error",
  msg,
  title,
}) => {
  let handleClose = () => setAlertOpen(false);
  let alertPos = {
    vertical: "bottom",
    horizontal: "right"
  }

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={alertPos}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default ShowFeedback;
