import { Helmet } from 'react-helmet';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography
} from '@material-ui/core';

import ProductListToolbar from '../components/Products/ProductListToolbar';
import products_mock from '../__mocks__/products';
import { Outlet } from 'react-router';

const ProductList = () => {
  

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
          {/* <Products products={products} loading={loading} /> */}
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
