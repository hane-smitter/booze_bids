import React from "react";
import { useSelector } from "react-redux";
import * as dateFns from "date-fns";
import {
  Typography,
  Paper,
  Container,
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CategoryIcon from "@material-ui/icons/Category";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const { loading, products, categories } = useSelector((state) => state.app);
  const classes = useStyles();
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const handleCatgoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };
  console.log("products from redux store");
  console.log(products);

  let timeDistanceToFuture = (startTime, endTime) => {
    let result = [],
      start = dateFns.parseISO(startTime),
      end = dateFns.parseISO(endTime),
      parts = ["year", "month", "day", "hour", "minute"];

    parts.forEach((part, i) => {
      let camelDate = part.charAt(0).toUpperCase() + part.slice(1);
      let time = dateFns[`differenceIn${camelDate}s`](end, start);
      if (time) {
        result.push(
          `${i === parts.length - 1 ? "and " : ""}${time} ${camelDate}${
            time === 1 ? "" : "s"
          }`
        );
        if (i < parts.length) end = dateFns[`sub${camelDate}s`](end, time);
      }
    });
    return result.join(" ");
  };

  return (
    <Container>
      <Box className={classes.productsTitleBox}>
        <Typography variant="h4" style={{ flexGrow: 4 }}>
          Current Auctions
        </Typography>

        {categories.length && (
          <Box style={{ flexGrow: 1 }} component="span">
            <List
              component="nav"
              aria-labelledby="categories"
              subheader={
                <ListSubheader component="div" id="categories">
                  Find by categories
                </ListSubheader>
              }
              className={classes.rootList}
            >
              <ListItem button onClick={handleCatgoryClick}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
                {categoryOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </ListItem>
              <Collapse
                className={classes.collapse}
                in={categoryOpen}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {categories.map((category) => (
                    <ListItem
                      button
                      className={classes.nested}
                      key={category._id}
                    >
                      <ListItemText primary={category.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Box>
        )}
      </Box>

      {loading && (
        <Box style={{ width: "100%" }} display="flex" justify-content="center">
          <CircularProgress />
        </Box>
      )}

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
              <Product calcTime={timeDistanceToFuture} product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Products;
