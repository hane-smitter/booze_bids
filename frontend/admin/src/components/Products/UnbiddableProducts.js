import React from "react";
import {
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Typography,
  Box,
  Card,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import UnbiddableProductCard from "./Product/UnbiddableProductCard";
import { getProducts } from "src/actions/products";
import imgDefault from "src/images/products/default.jpeg";
import FutureTimeCalc from "src/utils/FutureTimeCalc";
import moment from "moment";
import { useNavigate } from "react-router";

const UnbiddableProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <Card container spacing={3}>
          <Table>
            <TableHead>
                <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>RRP</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {unbiddableProducts.map((product) => (
              // <Grid item key={product.id} lg={4} md={6} xs={12}>
              //   <UnbiddableProductCard product={product} />
              // </Grid>
              <TableRow>
                <TableCell> 
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={product.image ?? imgDefault}
                        sx={{ mr: 2 }}
                      >
                        {/* {getInitials(product.name)} */}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.name}
                      </Typography>
                    </Box> 
                </TableCell>
                <TableCell>{product.cost}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{moment(product.createdAt).format("DD/MM/YYYY  HH:mm")}</TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={_ => {
                        navigate('createbid', { state: product });
                    }}
                >
                    Create bid
                </Button>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </Card>
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
