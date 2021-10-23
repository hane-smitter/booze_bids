import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const ShowFeedback = ({
  alertOpen,
  autoHideDuration = 4000, 
  setAlertOpen,
  severity = "info",
  msg,
  title,
}) => {
  let handleClose = () => setAlertOpen(false);

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default ShowFeedback;
