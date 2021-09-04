import React , { useEffect } from 'react';
import { 
    Container,
    Grow,
    Grid,
    Typography
} from '@material-ui/core';

import { useDispatch } from 'react-redux';

import { getProducts } from './actions/products';
import Users from './components/Users/Users.js';
import Form from './components/Form/Form.js';
import Navbar from './components/Nav';
import Banner from './components/Banners/Home/Home';
import avatar from './images/logo192.png';
import useStyles from './styles';
import Products from './components/Products/Products';

const App = () => {
    

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    

    return (
        <Container maxidth="lg">
            <Navbar/>
            <Grow in>
                <Container maxwidth="sm">
                    <Grid container justify="center">
                        <Banner />
                    </Grid>
                        {/* <Typography variant="h2" className={classes.heading}>Current Auctions</Typography> */}
                            <Products/>
                    {/* <Grid container justify="space-between" alignItems="stretch" spacing="3">
                         <Grid item xs={12} sm={4}>
                            <Form/>
                        </Grid> 
                    </Grid> */}
                </Container>
            </Grow>
        </Container>
    );
}

export default App;