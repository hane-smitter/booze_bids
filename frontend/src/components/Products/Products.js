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
            <Product/>
            <Product/>
        </>
    );
}

export default Products;