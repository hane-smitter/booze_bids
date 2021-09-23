import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    fontSize: 'inherit',
    minHeight: '300px',
    minWidth: '200px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize:'contain'
  },
  border: {
    border: 'solid',
  },
  borderBlack: {
    border:'solid 1px black'
  },
  darkBox: {
    color: "#000",
    backgroundColor: "#f0f0f0"
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  inputWrapper: {
    marginBlock: '15px',
    width: '100%'
  },
  warning: {
    color: '#ff9800',
    fontWeight:'bold',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  countdowntime: {
    width: "2ch",
  },
  countdown: {
    marginInlineStart: 10,
  }
});