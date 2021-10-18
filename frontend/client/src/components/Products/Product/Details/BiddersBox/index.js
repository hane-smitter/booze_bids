import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Divider,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  CardContent,
  Card,
  ListItemText,
} from "@material-ui/core";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageIcon from "@material-ui/icons/Image";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";

import { makeBid, fetchCurrentBidder } from "../../../../../actions/products";
import useStyles from "./styles.js";

const DarkBox = ({ product }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    err,
    loading,
    status,
    // bidder: { currentBidders },
  currentBidders
  } = useSelector((state) => state.app);
  let newBidder = Boolean(status?.info?.code === "newbiddinguser");

  //form initial values
  let initialValues = {
    bidAmount: product.bidPrice,
    bidder: {
      phone: "",
      acknowledgeNew: newBidder,
      firstname: "",
      lastname: "",
      location: "",
    },
    bidPrice: product.bidPrice,
    productId: product.product._id,
  }
  if (newBidder) {
    window.scroll({ top: 2, left: 0, behavior: "smooth" });
    if(window.sessionStorage && sessionStorage.getItem('bidderFormData')) {
      const previousBidderFormData = JSON.parse(sessionStorage.getItem('bidderFormData'));
      previousBidderFormData.bidder.acknowledgeNew = newBidder;
      Object.assign(initialValues, previousBidderFormData);
    }
  };

  let formFields = [
    "bidAmount",
    "bidder.phone",
    "bidder.lastname",
    "bidder.firstname",
    "bidder.location",
  ];
  let formErrors = [];
  let formErrorsName = [];
  formErrors =
    err.length && err.filter((error) => formFields.includes(error.param));
  formErrors.length &&
    formErrors.map((error) => formErrorsName.push(error.param));

  
  useEffect(() => {
    dispatch(fetchCurrentBidder({"productId": product.product._id}));
  }, []);
  return (
    <Box className={classes.darkBox}>
      <Card className={classes.cardRoot}>
        <Typography
          className={classes.white}
          style={{ backgroundColor:'#000', textAlign:'center'}}
          variant="h5"
        >Bid History
        </Typography>
          <CardContent>
            <Divider color="grey" />
            <List>
              <ListItem>
                <ListItemText>
                  Bid
                </ListItemText>
                <ListItemText>
                  User
                </ListItemText>
                <ListItemText>
                  Time
                </ListItemText>
              </ListItem>
              {currentBidders?.bidder?.length ?
                (<span>
                {currentBidders.bidder.map((item) => {
                  let cont = null;
                  cont = (
                  <ListItem style={{ padding:0,margin:0,fontSize:'4px'}}>
                    <ListItemText style={{ padding:0,margin:0,fontSize:'4px'}}>
                      {item?.bidAmountTotal ?? 0}
                    </ListItemText>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                    {item?.user?.surname ?? '__'}
                    </ListItemText>
                    <ListItemText>
                    {new Date(item?.createdAt ?? '').toLocaleString('en-US', {hour: 'numeric',minute:'numeric'})}
                    </ListItemText>
                  </ListItem>
                );
                return cont;
                })
                }</span>)
                :
                (<ListItem>
                  <ListItemText>
                    ...
                  </ListItemText>
                  <ListItemText>
                    ...
                  </ListItemText>
                  <ListItemText>
                    ...
                  </ListItemText>
                </ListItem>)
              }
            </List> 
            <Divider color="grey" />

          </CardContent>
      </Card>
    </Box>
  );
};

export default DarkBox;
