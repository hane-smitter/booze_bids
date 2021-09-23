import { makeStyles } from "@material-ui/core/styles";
import Background from '../../../images/bannerbg.png';

export default makeStyles(() => ({
    root: {
        backgroundImage: `url(${Background})`,
        marginLeft:'0px',
    },
    imgContainer: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'yes',
        height: '200px',
        marginBlockEnd: '20px',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '60%',
        marginBlockStart:'80px',
    },
    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '10px',
        objectFit: 'contain'
    }
}));