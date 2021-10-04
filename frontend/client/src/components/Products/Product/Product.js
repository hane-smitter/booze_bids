import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { makeBid, fetchTopBidder } from "../../../actions/products";
import { unsetErr } from "../../../actions/errors";
import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import FutureTimeCalc from "../../utils/FutureTimeCalc";
import MoneyFormat from "../../utils/MoneyFormat/index.js";
import BidForm from "./Form";
import ProductDetail from "./ProductDetail";

const Product = ({ product }) => {
  const classes = useStyles();

  const location = {
    pathname: "/detail",
    state: { product },
  };

  const cardVariants = {
    blink: {
      // backgroundColor: ['rgba(255, 255, 255, .9)', 'rgba(237, 82, 73, .1)', 'rgba(243, 32, 19, .3)', 'rgba(237, 82, 73, .1)', 'rgba(255, 255, 255, .9)'],
      backgroundColor: ['#f0f0f0', '#e6c96c', '#ebb957', '#f1a53c', '#f79224'],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        repeatDelay: 1
      }
    },
  }

  return (
      <Card
        className={classes.root,classes.borderBlack}
        component={motion.div}
        variants={cardVariants}
      >
        <CardHeader
          className={classes.capitalize}
          color="primary"
          subheader={product.product.name.length > 20 ? product.product.name.substr(0,20)+'...' : product.product.name}
        />
        <CardActionArea>
          <Link to={location}>
            <CardMedia
              className={classes.media}
              image={product.product.image || defaultImg}
              title={product.product.name}
            />
          </Link>
          <CardContent className={classes.darkBox}> 
            {/* product details */}
            <ProductDetail product={product}/>
            {/* product details */}
            {/* form */}
            <BidForm product={product}/>
            {/* .end of form */}
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

export default Product;
