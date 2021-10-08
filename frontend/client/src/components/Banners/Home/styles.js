import { makeStyles } from "@material-ui/core/styles";
import Background from '../../../images/bannerbg.png';

export default makeStyles(() => ({
    root: {
        backgroundColor: '#2b5681',
        fontFamily:'Open Sans',
    },
    imgContainer: {
        // backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'yes',
        height: '200px',
        // marginBlockEnd: '20px',
        // borderBottomLeftRadius: '50%',
        // borderBottomRightRadius: '60%',
        marginBlockStart:'-100px',
        backgroundColor:'#2b5681',
        width:'100%'
    },
    imgContainerMobi: {
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'yes',
        height: 'auto',
        // marginBlockEnd: '20px',
        // borderBottomLeftRadius: '50%',
        // borderBottomRightRadius: '60%',
        marginBlockStart:'-60px',
        backgroundColor:'#2b5681',
        width:'100%'
    },
    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '10px',
        objectFit: 'contain'
    }
}));