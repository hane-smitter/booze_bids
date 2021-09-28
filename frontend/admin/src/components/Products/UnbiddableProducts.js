import React from "react";
import {
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import UnbiddableProductCard from "./Product/UnbiddableProductCard";
import { getProducts } from "src/actions/products";

const UnbiddableProducts = () => {
  const dispatch = useDispatch();
  const {
    products: { allprod: products },
    loading,
  } = useSelector((state) => state.app);

  const [unbiddableProducts, setUnbiddableProducts] = React.useState(
    products.length > 0
      ? products.filter((product) => product.productbidscount === 0)
      : []
  );

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 1,
        }}
      >
        {loading ? <CircularProgress /> : null}
      </Box>
      {unbiddableProducts.length < 1 ? (
        <Paper variant="outlined">
          <Typography
            variant="h5"
            color="textSecondary"
            paddingX={2}
            align="center"
          >
            Sorry! No Products are available!!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {unbiddableProducts.map((product) => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <UnbiddableProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {unbiddableProducts.length < 1 ? null : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      )}
    </>
  );
};

export default UnbiddableProducts;
