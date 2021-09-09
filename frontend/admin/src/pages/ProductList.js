import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography
} from '@material-ui/core';

import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';
import products_mock from '../__mocks__/products';
import { getProducts } from '../actions/products';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.app.products);
  const loading = useSelector((state) => state.app.loading);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  console.log("products from redux store");
  console.log(products);

  return (
    <>
      <Helmet>
        <title>Products | Booze Bids</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              py: 1
             }}>
              {loading ? <CircularProgress /> : null}
             </Box>
            {products.length < 1 ? (
                <Paper variant="outlined">
                  <Typography variant="h5" color="textSecondary" align="center">
                    Sorry! No Products are available!!
                  </Typography>
                </Paper>
              ) :
              (
                <Grid
                  container
                  spacing={3}
                >
                  {products.map((product) => (
                    <Grid
                      item
                      key={product.id}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )
            }
          </Box>
          {products.length < 1 ? null : (<Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>)}
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
