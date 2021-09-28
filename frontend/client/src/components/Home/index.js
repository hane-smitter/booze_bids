import React , { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Container,
    Grow,
    Grid,
    Typography
} from '@material-ui/core';


import { getProducts } from '../../actions/products';
import Users from '../Users/Users.js';
import Navbar from '../Nav';
import Banner from '../Banners/Home/Home';
import useStyles from './styles';
import Products from '../Products/Products';
import Footer from '../Footer';

const Home = () => {
    

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            
                <Grow in>
                    <Container maxwidth="md">
                        <Navbar/>
                        <Banner />
                        {/* <Grid container justifyContent="center" className={classes.bg}>
                            <Banner />
                        </Grid> */}
                        <Products/>
                        {/* <Grid container justifyContent="space-between" alignItems="stretch" spacing="3">
                            <Grid item xs={12} sm={4}>
                                <Form/>
                            </Grid> 
                        </Grid> */}
                    </Container>
                </Grow> 
                <Footer/>
        </div>
    );
}

export default Home;