import React , { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Container,
    Grow,
    Box,
    Grid,
    Typography,
    Paper
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { getProducts } from '../../actions/products';
import Users from '../Users/Users.js';
import Navbar from '../Nav';
import Banner from '../Banners/Home/Home';
import useStyles from './styles';
import Products from '../Products/Products';
import Footer from '../Footer';
import Pagination from '../Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}
const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // useEffect(() => {
    //     dispatch(getProducts());
    // }, [dispatch]);

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
                        <Box style={{ borderLeft:'solid 2px #2b5681',borderRight:'solid 2px #2b5681',marginTop:'-20px'}}>
                        <Grid container justifyContent="center" alignItems="stretch" spacing="3">
                            <Grid item xs={12} sm={6} md={3}>
                                    <Pagination page={page}/>
                            </Grid> 
                        </Grid>
                        </Box>
                        {/* pagination */}
                        <Footer/>
                    </Container>
                </Grow> 
               
        </div>
    );
}

export default Home;