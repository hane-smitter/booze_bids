import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  lightBox: {
    backgroundColor: theme.palette.background.paper,
    color: "#333",
    padding: "20px",
    width: "100%"
  },
  darkBox: {
    color: "#fff",
    backgroundColor: "#181D32",
    width: "100%",
    padding: "20px"
  },
  flex: {
      display: "flex",
      alignItems: "stretch"
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
      maxWidth: "100%"
  },
  rootTextField: {
      "& .MuiInputBase-root": {
          color: "rgba(245, 245, 245, 1)"
      },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    }
  }
}));
