import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  darkBox: {
    color: "#fff",
    backgroundColor: "#181D32",
    width: "100%",
    padding: "20px",
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
