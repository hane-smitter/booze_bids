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
    CircularProgress } from "@material-ui/core";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
    
import useStyles from "./styles";
import defaultImg from '../../../images/products/defaultImg.jpeg'
import { makeBid } from '../../../actions/products';
import { unsetErr } from '../../../actions/errors';

const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { err, loading } = useSelector((state) => state.app);

  let formFields = ["bidAmount", "phone"];
  let formErrors = [];
  let formErrorsName = [];
  formErrors = err.length && err.filter((error) => formFields.includes(error.param));
  formErrors.length && formErrors.map((error) => formErrorsName.push(error.param));

  const makeBidSchema = Yup.object().shape({
    bidAmount: Yup.number()
      .required("Bidding amount is required")
      .positive("This amount is not allowed")
      .positive(),
    phone: Yup.number()
      .required("Phone number is required")
      .integer(),
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
          error={(form.touched[name] && !!form.errors[name]) || formErrorsName.indexOf(name) !== -1}
          helperText={(form.touched[name] && form.errors[name]) || (formErrorsName.indexOf(name) !== -1 && formErrors[formErrorsName.indexOf(name)].msg)}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          variant="outlined"
          margin="normal"
          fullWidth
          {...others}
        />
    )

    useEffect(() => {
        return () => {
            dispatch(unsetErr());
        };
        }, []);
  return (
    <Card className={classes.root}>
        <CardHeader
            subheader="Ends in: 07 Days 19 Hours 45 Mins 53 Secs"
        />
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={product.product.image ? product.product.image : defaultImg}
                title={product.product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                {product.product.name}
                </Typography>
                <Typography  variant="h5" component="h2">
                    RRP: KSH {product.product.cost}
                </Typography>
                
            </CardContent>
        </CardActionArea>
        <CardActions className = {classes.flexWrap}>

        <Typography variant="body2" color="textSecondary" component="p">
            Place your bid
            Bid costs only {product.bidPrice}/= Enter your lowest unique bid amount and phone number then standby to pay via Mpesa
        </Typography>

        <Formik
       initialValues={{
           bidAmount: '',
           phone: '',
           bidPrice: product.bidPrice,
           productId: product.product._id
        }}
       onSubmit={(values, actions) => {
        dispatch(makeBid(values));
        actions.setSubmitting(loading);
         /* setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000); */
       }}
       validationSchema={makeBidSchema}
     >
       {props => (
         <form onSubmit={props.handleSubmit} autoComplete="off" noValidate>
           <Field
            formErrors={formErrors}
            formErrorsName={formErrorsName}
            name="bidAmount"
            placeholder="for example 237"
            component={Input}
           />
           <Field
            formErrors={formErrors}
            formErrorsName={formErrorsName}
            name="phone"
            placeholder="Your phone number"
            component={Input}
           />

           <Button
                type="submit"
                variant="contained"
                color='primary'
                fullWidth
            >
                {loading ? (
                    <CircularProgress style={{ color: "white" }} />
                ) : (
                "Place your bid"
                )}
            </Button>
         </form>
       )}
     </Formik>
        </CardActions>
    </Card>
  );
};

export default Product;
