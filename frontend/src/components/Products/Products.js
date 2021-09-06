import { Typography, Paper, Container, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const products = useSelector((state) => state.products);
  const classes = useStyles();

  console.log("products from redux store");
  console.log(products);

  return (
    <Container>
      {products.length < 1 ? (
        <Paper variant="outlined" className={classes.center}>
          <Typography variant="h5" color="textSecondary" align="center">
            Sorry! no Products are available!!
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Product />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Products;
