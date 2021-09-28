import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import ProductCard from './Product/ProductCard';
import { getProducts } from 'src/actions/products';
import ProductTabs from './ProductTabs';
import AllProducts from './AllProducts';
import BiddableProducts from './BiddableProducts';
import UnbiddableProducts from './UnbiddableProducts';


function spreadAttr(index) {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tabpanel-${index}`,
  };
}

const Products = () => {
  const [view, setView] = React.useState(0);

  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={view}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Products" {...spreadAttr(0)} />
          <Tab label="Biddable Products" {...spreadAttr(1)} />
          <Tab label="UnBiddable Products" {...spreadAttr(2)} />
        </Tabs>
      </Box>
      <ProductTabs value={view} index={0}>
        <AllProducts />
      </ProductTabs>
      <ProductTabs value={view} index={1}>
        <BiddableProducts />
      </ProductTabs>
      <ProductTabs value={view} index={2}>
        <UnbiddableProducts />
      </ProductTabs>
    </Box>
  );
};

export default Products;
