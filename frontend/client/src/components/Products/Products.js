import { Typography,
  Paper,
  Container,
  Grid,
  Box,
  CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const { loading, products } = useSelector((state) => state.app);
  const classes = useStyles();

  console.log("products from redux store");
  console.log(products);

  return (
    <Container>
      { loading && (
        <Box style={{ width: '100%' }} display="flex" justify-content="center">
          <CircularProgress />
        </Box>
      ) }
      {products.length < 1 ? (
        <Paper variant="outlined" className={classes.center}>
          <Typography variant="h5" color="textSecondary" align="center">
            Sorry! No Products are available!!
          </Typography>
        </Paper>
      ) : (
        <Grid
          container
          justifyContent="space-around"
          alignItems="stretch"
          spacing={6}
        >
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Products;
