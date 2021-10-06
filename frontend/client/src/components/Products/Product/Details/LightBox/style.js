import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  lightBox: {
    backgroundColor: theme.palette.background.paper,
    color: "#333",
    padding: "20px",
    width: "100%",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  cardRoot: {
    fontSize: "small",
  },
  media: {
    height: 300,
    objectFit: "contain",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  countdowntime: {
    width: "2ch",
  },
  countdown: {
    marginInlineStart: 10,
  },
  warning: {
    color: "#ff9800",
    fontWeight: "bold",
  },
  danger :{
    color: 'red',
    fontWeight:'bold',
  }
}));
