import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  darkBox: {
    color: "#fff",
    width: "100%",
    padding: "10px",
    backgroundColor:'#181D32',
    objectFit:'contain'
  },
  lightBox: {
    backgroundColor: theme.palette.background.paper,
    color: "#000",
    marginBlockEnd:'50px',
    padding:'15px'
  },
  white: {
    color:'white'
  },
  cardRoot: {
    // fontSize: "small",
    color: "#000",
    backgroundColor: "#181D32",
  },
  rootTextField: {
    padding:0,
    margin:0,
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
  label: {
    color: "#181D32",
    fontWeight: "bold",
    paddingBottom:'1px',
  },
  title: {
    textShadow: '0 0 24px #00a8fa',
    fontWeight:900,
    textTransform: 'uppercase',
    fontSize:'28px'
  },
  step: {
    textShadow: '0 0 24px #00a8fa',
  }
}));
