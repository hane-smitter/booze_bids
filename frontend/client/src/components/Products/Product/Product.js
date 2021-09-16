import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import { makeBid } from "../../../actions/products";
import { unsetErr } from "../../../actions/errors";

const Product = ({ calcTime, product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { err, loading } = useSelector((state) => state.app);
  const [nowLoading, setNowLoading] = useState(Boolean(false));

  let formFields = ["bidAmount", "phone"];
  let formErrors = [];
  let formErrorsName = [];
  formErrors =
    err.length && err.filter((error) => formFields.includes(error.param));
  formErrors.length &&
    formErrors.map((error) => formErrorsName.push(error.param));

  const makeBidSchema = Yup.object().shape({
    bidAmount: Yup.number()
      .required("Bidding amount is required")
      .positive("This amount is not allowed")
      .positive(),
    phone: Yup.number().required("Phone number is required").integer(),
  });

  const Input = ({
    form,
    field: { value, name },
    formErrors,
    formErrorsName,
    ...others
  }) => (
    <TextField
      name={name}
      value={value}
      error={
        (form.touched[name] && !!form.errors[name]) ||
        formErrorsName.indexOf(name) !== -1
      }
      helperText={
        (form.touched[name] && form.errors[name]) ||
        (formErrorsName.indexOf(name) !== -1 &&
          formErrors[formErrorsName.indexOf(name)].msg)
      }
      onChange={form.handleChange}
      onBlur={form.handleBlur}
      variant="outlined"
      margin="normal"
      fullWidth
      {...others}
    />
  );

  useEffect(() => {
    return () => {
      dispatch(unsetErr());
    };
  }, []);
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.capitalize} color="primary" subheader={product.product.name} />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.product.image ? product.product.image : defaultImg}
          title={product.product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="p" className={classes.warning}>
            {`Ends in: ${calcTime(product.startTime, product.endTime)}`}
          </Typography>
          <Typography variant="p" component="p">
            RRP: KSH {product.product.cost}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
