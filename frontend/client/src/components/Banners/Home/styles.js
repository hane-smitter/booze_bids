import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    imgContainer: {
        height: '200px',
        marginBlockEnd: '20px',
        backgroundColor: '#F5F6FA',
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