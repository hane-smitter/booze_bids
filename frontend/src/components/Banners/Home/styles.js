import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    imgContainer: {
        height: '200px',
        marginBlockEnd: '20px'
    },
    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'contain'
    }
}));