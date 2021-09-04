import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import Product from './Product/Product';
import useStyles from './styles';

const Products = () => {
    const products = useSelector((state) => state.products)
    const classes = useStyles();

    console.log(products);

    return (
        <>
            <h1>Products</h1>
            <Container>
                {/* <div className={classes.mainContainer}>
                    {[...Array(10)].map(() => (<Product/>))}
                </div> */}
                <Grid container justify="space-around" alignItems="stretch" spacing={6}>
                        {[...Array(9)].map(() => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Product/>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </>
    );
}

export default Products;