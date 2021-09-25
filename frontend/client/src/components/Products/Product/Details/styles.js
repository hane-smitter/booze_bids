import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  topStart: {
    marginBlockStart:'100px'
  },
  darkBox: {
    color: "#fff",
    backgroundColor: "#181D32",
    width: "100%",
    padding: "20px",
  },
  flex: {
    display: "flex",
    alignItems: "stretch",
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
  success: {
    color: '#42b449',
    fontWeight:'bold',
  },
  bold: {
    fontWeight:'bold',
  },
}));
