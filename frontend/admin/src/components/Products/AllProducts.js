import React, { useState } from "react";
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
  Typography,
  Box,
  CardMedia,
  Avatar,
  Card
} from "@mui/material";
import { useSelector } from "react-redux";

import ProductCard from "./Product/ProductCard";
import { getProducts } from "src/actions/products";
import imgDefault from "src/images/products/default.jpeg";
import FutureTimeCalc from "src/utils/FutureTimeCalc";
import moment from "moment";

const AllProducts = ({ setImgObj, setImgPrev, setProduct, toggle, dispatch}) => {
  const { products: { allprod:products }, loading } = useSelector((state) => state.app); 
  const [time, setTime] = useState("00 Days 00 Hours 00 Mins 00 Secs");


  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

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
        <Card container spacing={3}>
          <Table>
            <TableHead>
                <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>RRP</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Bid status</TableCell>
                <TableCell>Created On</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {products.map((product) => (
                <ProductCard product={product} setProduct={setProduct} setImgPrev={setImgPrev} setImgObj={setImgObj} toggle={toggle} />
            ))}
            </TableBody>
            </Table>
        </Card>
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

export default AllProducts;
