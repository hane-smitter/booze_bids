import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Paper,
  Container,
  Grid,
  Box,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CategoryIcon from "@material-ui/icons/Category";
import SearchBar from "material-ui-search-bar";
import Product from "./Product/Product";
import useStyles from "./styles";
import { getProducts } from "../../actions/products";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products, categories } = useSelector((state) => state.app);
  const classes = useStyles();
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const handleCatgoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };
  const [criteria, setCriteria] = React.useState("1");
  const [searchItem, setSearchItem] = React.useState("");
  console.log(criteria);
  return (
    <Container>
      <Box className={classes.productsTitleBox}>
        
        
        {/* {categories.length && ( */}
          <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={4}>
              <Box style={{ flexGrow: 4 }} component="span">
                <List
                  component="nav"
                  aria-labelledby="categories"
                  
                  className={classes.rootList}
                >
                  
                  <ListItem button onClick={handleCatgoryClick}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Browse categories" />
                    {categoryOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </ListItem>
                  <Collapse
                    className={classes.collapse}
                    in={categoryOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem
                          button
                          className={classes.nested}
                          onClick={() => {
                            setCategoryOpen(false);
                            dispatch(getProducts());
                          }}
                        >
                          <ListItemText primary={"All"} />
                        </ListItem>
                      {categories.map((category) => (
                        <ListItem
                          button
                          className={classes.nested}
                          key={category._id}
                          onClick={() => {
                            setCategoryOpen(false);
                            dispatch(getProducts(`category=${category.category_slug}`));
                          }}
                        >
                          <ListItemText primary={category.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </Box>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        {/* )} */}
          <Grid item  style={{ flexGrow: 1 }} xs={12} sm={4}>
            <Typography >
              <SearchBar
                      value={searchItem}
                      onChange={value => {
                        setSearchItem(value);
                      }}
                      onRequestSearch={() => console.log("onRequestSearch")}
                      style={{
                        maxWidth: 400,
                        margin:10
                      }}
                    />
            </Typography>
          </Grid>
        </Grid>
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
          {products.map((product) => {
            let content = null;
            if (Boolean(product.product)) {
              content = (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Product product={product} />
                </Grid>)
            }
            return content;
            
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Products;
