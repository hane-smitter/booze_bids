import { Helmet } from "react-helmet";
import { Box, Container } from "@mui/material";

import ProductListToolbar from "../components/Products/ProductListToolbar";
import { Outlet } from "react-router";

const ProductList = () => {
  return (
    <>
      <Helmet>
        <title>Products | Booze Bids</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
