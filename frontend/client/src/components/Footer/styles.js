import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        marginBlockStart: '20px',
        textAlign:"center",
        backgroundColor: '#020b14',
        color: '#ffffff',
        fontSize:'12px',
        maxWidth: '92%',
    },
    bg: {
        backgroundColor: '#f0f0f0',
    },
    center: {
        margin: 'auto',
        textAlign:'center'
    },
    headers: {
        marginBlockStart: '10px',
        fontSize: '13px',
        fontWeight: 'bold',
    },
    logo: {
        maxWidth:'130px',
        objectFit:'contain'
    },
    divider: {
        maxWidth:'90%'
    }
}));