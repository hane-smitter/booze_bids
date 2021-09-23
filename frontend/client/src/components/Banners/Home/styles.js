import { makeStyles } from "@material-ui/core/styles";
import Background from '../../../images/bannerbg.png';

export default makeStyles(() => ({
    root: {
        backgroundImage: `url(${Background})`
    },
    imgContainer: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '200px',
        marginBlockEnd: '20px',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%'
    },
    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '10px',
        objectFit: 'contain'
    }
}));