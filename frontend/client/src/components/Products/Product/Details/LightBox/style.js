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
    border:'1px solid blue'
  },
  media: {
    objectFit: "contain",
    maxHeight: "100%",
    maxWidth: "60%",
    margin:'auto',
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
  },
  ribbon: {
    position: 'relative',
    top: '0%',
    float:'right',
    backgroundColor: 'red',
    width: '70px',
    height: '70px',
    marginRight:'20px',
    marginLeft:'-30px',
    cursor: 'pointer',
    },
    ribbon2: {
      position: 'relative',
      top: '0%',
      float:'center',
      backgroundColor: 'red',
      width: 'auto',
      marginTop:'-20px',
      height: '100px',
      cursor: 'pointer',
      }
}));
