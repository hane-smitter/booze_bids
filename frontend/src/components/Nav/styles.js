import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        marginBlockStart: '10px',
        marginBlockEnd: '20px'
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBlock: '10px'
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    image: {
        display: 'block',
        width: '80px',
        height: '60px',
    },
    navLink: {
        marginInline: '5px'
    },
    navContainer: {
        maxWidth: '300px',
    }
}));