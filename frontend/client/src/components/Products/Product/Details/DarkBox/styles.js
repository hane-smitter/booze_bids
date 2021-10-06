import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  darkBox: {
    color: "#fff",
    width: "100%",
    padding: "20px",
  },
  white: {
    color:'white'
  },
  cardRoot: {
    // fontSize: "small",
    color: "#fff",
    backgroundColor: "#181D32",
  },
  rootTextField: {
    "& .MuiInputBase-root, .MuiFormLabel-root": {
      color: "rgba(245, 245, 245, 1)",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
  warning: {
    color: "#ff9800",
    fontWeight: "bold",
  },
}));
