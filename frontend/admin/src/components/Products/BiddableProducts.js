import React from "react";
import {
  Card,
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
  Avatar,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { getBiddableProducts } from "src/actions/products";
import BiddableProductCard from "./Product/BiddableProductCard";
import imgDefault from "src/images/products/default.jpeg";
import { format, parseISO } from 'date-fns';
import moment from "moment";

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
      {products.length < 1 ? 
      (<Paper variant="outlined">
          <Typography
            variant="h5"
            color="textSecondary"
            paddingX={2}
            align="center"
          >
            Sorry! No Products are available!!
          </Typography>
        </Paper>) 
        : 
        (<Card container spacing={3}>
          <Table>
            <TableHead>
                <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Bid ID</TableCell>
                <TableCell>RRP</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Proceeds</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Slots</TableCell>
                <TableCell>Created On</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                // <Grid item key={product.id} lg={4} md={6} xs={12}>
                //   <BiddableProductCard product={product} />
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
                        src={product.product?.image ?? imgDefault}
                        sx={{ mr: 2 }}
                      >
                        {/* {getInitials(product.name)} */}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="caption"
                        component="p"
                      >
                        {product.product?.name}
                      </Typography>
                    </Box> 
                  </TableCell>
                  <TableCell>
                    <Typography  variant="caption" component="p">
                      {product.id.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography  variant="caption" component="p">
                      {product.product?.cost}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography  variant="caption" component="p" color="textPrimary">
                        Bid price: {product.bidPrice}
                    </Typography>
                    <Typography  variant="caption" component="p" color="textPrimary">
                      Target Amt.: {product.targetAmount}
                    </Typography>
                  </TableCell>
                  <Table>
                    <Typography color="textPrimary" variant="body1" component="p" color="textPrimary">
                      {product.prodbids?.reduce((prev, curr) => prev + curr.bidAmountTotal,0)}
                    </Typography>
                  </Table>
                  <TableCell>
                    <Typography  variant="caption" component="p" color="textPrimary">
                        From: {format(parseISO(product.startTime), 'dd/MM/yyyy HH:mm:ss')}
                    </Typography>
                    <Typography  variant="caption" component="p" color="textPrimary">
                      To: {format(parseISO(product.endTime), 'dd/MM/yyyy HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography  variant="caption" component="p" color="textPrimary">
                      Slots: {product.slots}
                    </Typography>
                    <Typography  variant="caption" component="p" color="textPrimary">
                      Extra slots: {product.extraSlots}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography  variant="caption" component="p">
                      {moment(product.createdAt).format("DD/MM/YYYY  HH:mm")}
                    </Typography>
                  </TableCell>
                </TableRow>
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

export default BiddableProducts;
