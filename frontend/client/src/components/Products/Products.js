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
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CategoryIcon from "@material-ui/icons/Category";
import { decode } from "html-entities";

import SearchBar from "material-ui-search-bar";
import Product from "./Product/Product";
import useStyles from "./styles";
import { getProducts } from "../../actions/products";
import { unsetErr } from "../../actions/errors";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products, categories, err } = useSelector((state) => state.app);
  const classes = useStyles();
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const handleCatgoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };
  const [criteria, setCriteria] = React.useState("1");
  const [searchItem, setSearchItem] = React.useState("");

  React.useEffect(() => {
    return() => {
      dispatch(unsetErr());
      window.scroll(0, 0);
    }
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div align="center" className={classes.borderBlue}>
      <Box className={classes.productsTitleBox}>
        
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          
          <Grid style={{ height:40 }} item xs={12} sm={4}>
            <Box component="span">
              <List style={{ height:25,padding:0 }} 
                component="nav"
                aria-labelledby="categories"
                className={classes.rootList}
              >
                <ListItem button onClick={handleCatgoryClick}>
                  {/* <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon> */}
                  <ListItemText primary="Browse Categories" />
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
                          dispatch(
                            getProducts(`category=${category.category_slug}`)
                          );
                        }}
                      >
                        <ListItemText primary={decode(category.name ? category.name : '')}  />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
          {!isMobile && (
          <Grid item style={{ flexGrow: 1 }} xs={12} sm={4}>
            <Typography>
              <SearchBar
                value={searchItem}
                onChange={(value) => {
                  setCategoryOpen(false);
                  dispatch(
                    getProducts(`search=${value}`)
                  );
                }}
                onRequestSearch={() => console.log("onRequestSearch")}
                style={{
                  maxWidth: 400,
                  margin: 5,
                  height:30,
                  backgroundColor:'#4472c4',
                  color:'#ffffff',
                }}
              />
            </Typography>
          </Grid>
          )}
        </Grid>
      </Box>

      {loading && (
        <Paper variant="outlined" className={classes.center}>
          <CircularProgress align='center'/>
        </Paper>
      )}

      {!loading && !products?.length ? (
        <Paper variant="outlined" className={classes.center}>
          <Typography variant="h5" color="textSecondary" align="center">
            Sorry! No Products are available!!
          </Typography>
        </Paper>
      ) : (
        <Grid
          container
          justifyContent={isMobile ? "space-around" : "left"}
          alignItems="stretch"
          spacing={3}
          style={{marginBlock:20}}
        >
          {products.map((product) => {
            let content = null;
            if (Boolean(product.product)) {
              content = (
                <Grid style={{ maxWidth:250 }} item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Product product={product} />
                </Grid>
              );
            }
            return content;
          })}
        </Grid>
      )}
    </div>
  );
};

export default Products;
