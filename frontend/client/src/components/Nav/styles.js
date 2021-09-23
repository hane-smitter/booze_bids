import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        // borderRadius: 15,
        // marginBlockStart: '10px',
        // marginBlockEnd: '20px',
        backgroundColor: '#020b14',
        color: '#ffffff'
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBlock: '10px',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    image: {
        display: 'block',
        height: '65px',
    },
    kenya:{
        display: 'block',
        height: '20px',
        marginLeft:'170px'
    },
    position: {
        position: 'relative',
        margin:'auto',
        height:'40px'
    },
    navLink: {
        marginInline: '5px',
        color: '#ffffff',//'#283c9d',
        fontWeight:'bold',
        fontFamily: 'Open Sans',
        fontSize:'18px',
        textDecoration: 'none',
        "&:hover": {
            textDecoration:'underline'
          },
    },
    navContainer: {
        maxWidth: '200px',
    }
}));