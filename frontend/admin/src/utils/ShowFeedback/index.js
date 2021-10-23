import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const ShowFeedback = ({
  alertOpen,
  autoHideDuration = 3000,
  close,
  severity = "error",
  msg,
  title,
}) => {
  // let handleClose = () => setAlertOpen(false);
  let alertPos = {
    vertical: "bottom",
    horizontal: "right"
  }

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={autoHideDuration}
      onClose={close}
      anchorOrigin={alertPos}
    >
      <Alert onClose={close} severity={severity} sx={{ width: "100%" }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default ShowFeedback;
