import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    imgContainer: {
        height: '200px',
        marginBlockEnd: '20px',
        backgroundColor: '#1A4357',
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