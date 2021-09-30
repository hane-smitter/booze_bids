import { makeStyles } from '@mui/styles';

export default makeStyles({
  root: {
    fontSize: 'inherit',
  },
  media: {
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundBlendMode: 'darken',
    objectFit: 'contain'
  },
  border: {
    border: 'solid',
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
  }
});