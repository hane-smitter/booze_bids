import React , { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getProducts } from './actions/products';
import Users from './components/Users/Users.js';
import Form from './components/Form/Form.js';
import avatar from './images/logo192.png';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Container maxidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Users</Typography>
                <img className={classes.image} src={avatar} alt="Image" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing="3">
                        <Grid item xs={12} sm={7}>
                            <Users/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;