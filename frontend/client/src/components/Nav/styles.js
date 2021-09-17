import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        // borderRadius: 15,
        marginBlockStart: '10px',
        // marginBlockEnd: '20px',
        backgroundColor: '#ff9800',
        color: 'whitesmoke'
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBlock: '10px',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    image: {
        display: 'block',
        height: '80px',
    },
    navLink: {
        marginInline: '5px',
        color: 'whitesmoke'
    },
    navContainer: {
        maxWidth: '300px',
    }
}));