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

import { getBiddableProducts } from "src/actions/products";
import BiddableProductCard from "./Product/BiddableProductCard";

const BiddableProducts = () => {
  const dispatch = useDispatch();
  const {
    products: { biddableprod: products },
    loading,
  } = useSelector((state) => state.app);

  React.useEffect(() => {
    dispatch(getBiddableProducts());
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
      {products.length < 1 ? (
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
          {products.map((product) => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <BiddableProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {products.length < 1 ? null : (
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

export default BiddableProducts;
