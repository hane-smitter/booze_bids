import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        // marginBlockStart: '20px',
        // textAlign:"center",
        backgroundColor: '#020b14',
        color: '#ffffff',
        fontSize:'16px',
    },
    bg: {
        backgroundColor: '#f0f0f0',
    },
    center: {
        margin: 'auto',
        textAlign:'center'
    },
    headers: {
        marginBlockStart: '15px',
        fontSize: '18px',
        fontWeight: 'bold',
        textDecoration:'underline'
    },
    logo: {
        maxWidth:'130px',
        objectFit:'contain',
        marginLeft:'-17px'
    },
    divider: {
        maxWidth:'90%'
    },
    listItem: {
        padding:0,
        fontSize:'16px',

    }
}));