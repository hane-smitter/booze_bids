import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( (theme) => ({
        bg: {
            backgroundColor: "#ff9800",
            width: "100%"
        },
        pagination: {
            borderRadius: 4,
            marginTop: '1rem',
            padding: '16px',
          },
          gridContainer: {
            [theme.breakpoints.down('xs')]: {
              flexDirection: 'column-reverse',
            },
          },
}));