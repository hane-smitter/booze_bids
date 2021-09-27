import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        marginBlockStart: '20px',
        textAlign:"center",
        backgroundColor: '#020b14',
        color: '#ffffff'
    },
    bg: {
        backgroundColor: '#f0f0f0',
    },
    center: {
        margin: 'auto'
    },
    headers: {
        marginBlockStart: '10px',
        fontWeight: 'bold',
    },
    logo: {
        maxWidth:'130px',
        objectFit:'contain'
    }
}));