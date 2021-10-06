import React from "react";
import { useSelector } from "react-redux";

const useShowFeedback = () => {
  const { err, status } = useSelector((state) => state.app);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errAlertOpen, setErrAlertOpen] = React.useState(false);
  let initMsg = '';
  let initSeverity = '';
  let initErrMsg = [{msg: ''}];
  const [msg, setMsg] = React.useState(initMsg);
  const [errMsg, setErrMsg] = React.useState(initErrMsg);
  const [severity, setSeverity] = React.useState(initSeverity);

  function close() {
    setAlertOpen(false);
    setErrAlertOpen(false);
  }

  React.useEffect(() => {
    if(Boolean(status?.info)) {
      setAlertOpen(true);
      setMsg(status?.info?.message || '');
      setSeverity(status.info?.severity || undefined);
    }
  }, [status]);
  React.useEffect(() => {
    if(err.length > 0) {
      setErrAlertOpen(true);
      setErrMsg(err);
      setSeverity('error');
    }
  }, [err]);

  return {alertOpen, msg, errAlertOpen, errMsg, severity, close};
};

export default useShowFeedback;
