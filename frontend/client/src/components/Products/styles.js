import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexItem: {
    maxWidth: '100px'
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  center: {
    height: '300px',//#F5F5F5
    display: 'grid',
    placeItems: 'center'
  },
  productsTitleBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBlockEnd: '20px',
    backgroundColor:'#d0d0d0',  
  },
  w100: {
    // width: '100%'
  },
  rootList: {
    '& .MuiListSubheader-root': {
      lineHeight: '20px',
      paddingBlockEnd: '10px'
    },
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#d0d0d0',
    position: 'relative',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collapse: {
    width: '100%',
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    zIndex: 10,
    overflow: 'auto',
    maxHeight: 300
  },
}));