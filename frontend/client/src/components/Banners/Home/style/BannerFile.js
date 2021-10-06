import { makeStyles } from "@material-ui/core/styles";
import BannerBg from '../../../../images/bannerbg.png';
import BannerFile from "../Banner";
export default makeStyles(() => ({
    Banner: {
        height: '195px',
        position: 'relative',
        maxWidth:'100%',
        margin:'auto',
        justifyContent:'center',
   },
    Media: {
        backgroundSize: 'contain',
        maxWidth:'100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: '300ms',
        cursor: 'pointer',
        "&:hover": {
            filter: 'brightness(115%)',
          },
   },
    MediaCaption: {
        textOverflow: 'ellipsis',
        position: 'absolute',
        bottom: '0',
        padding: '10px',
        backgroundColor: 'black',
        color: 'white',
        opacity: '06',
        width: '100%',
        height: '7%',
        fontSize: '18px',
        fontWeight: '200',
        transition: '300ms',
        cursor: 'pointer',
        "&:hover": {
            opacity: '0.8',
          },
   },

    BannerGrid: {
        height: '100%',
        position: 'relative',
   },
    Content: {
        color: 'white',
        backgroundImage: BannerBg,
        backgroundSize:'contain',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        padding: '20px',
        transition: '300ms',
        "&:active": {
            backgroundColor: '#571111',
          },
   },
    ViewButton: {
        backgroundColor: '#f1f1f1',
        color: '#771818',
   },
    Title: {
        fontSize: '40px',
        fontWeight: '500',
   },
    Caption: {
        marginTop: '10px',
        fontSize: '21px',
   },
    ViewButton: {
        marginTop: '40px',
        color: 'white',
        fontSize: '25px',
        border: '3px solid white',
        textTransform: 'capitalize',
        transition: '200ms',
   }
    
}));
