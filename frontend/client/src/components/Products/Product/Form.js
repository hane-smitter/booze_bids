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
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { makeBid, fetchTopBidder } from "../../../actions/products";
import { unsetErr } from "../../../actions/errors";

const BidForm = ({product}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
        
    const { err, loading, status } = useSelector((state) => state.app);
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
        .min(product.bidPrice, `Minimum bidding amount is ${product.bidPrice}`)
        .integer(),
        bidder: Yup.object().shape({
        phone: Yup.number("You phone number should be numerical")
            .required("Phone number is required")
            .integer(),
        acknowledgeNew: Yup.boolean(),
        firstname: Yup.string().when("acknowledgeNew", {
            is: true,
            then: Yup.string().required("Your other name(firstname) is required"),
        }),
        lastname: Yup.string().when("acknowledgeNew", {
            is: true,
            then: Yup.string().required("Your surname is required"),
        }),
        location: Yup.string().when("acknowledgeNew", {
            is: true,
            then: Yup.string().required(
            "Your location(e.g nearest town) is required"
            ),
        }),
        }),
    });
    const Input = ({
        form,
        field: { value, name },
        formErrors,
        formErrorsName,
        ...others
    }) => {
        return (
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
    };
    useEffect(() => {
        if (window.shouldClearForm) {
          window.shouldClearForm();
          delete window.shouldClearForm;
        }
      }, [status, dispatch]);
    return (
        <Formik
        initialValues={{
        bidAmount: product.bidPrice,
        phone: "",
        bidPrice: product.bidPrice,
        productId: product.product._id,
        }}
        onSubmit={function(values, actions) {
        let currentCard = document.querySelector(`#bid4m-${product._id}`);

        currentCard.dataset.id === product._id && setNowLoading(loading);

        dispatch(makeBid(values));
        actions.setSubmitting(loading);
        /* setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
    }, 1000); */
        }}
        validationSchema={makeBidSchema}
        >
        {(props) => (
        <form onSubmit={props.handleSubmit} id={"bid4m-" + product._id} autoComplete="off" noValidate data-id={product._id}>
            
            <Field
            style={{ padding:0,margin:0 }}
            formErrors={formErrors}
            formErrorsName={formErrorsName}
            name="bidAmount"
            placeholder="Bid Amount"
            component={Input}
            size="small"
            inputProps={{ min: product.bidPrice }}
            type="number"
            />
            <Field
                formErrors={formErrors}
                formErrorsName={formErrorsName}
                name="phone"
                placeholder="Phone Number"
                component={Input}
                size="small"
            />
                
            <Button
            type="submit"
            variant="contained"
            style = {{ backgroundColor:'#f79224',color:'#fff' }}
            >
            {nowLoading ? (
                <CircularProgress style={{ color: "white" }} />
            ) : (
                "Place Your Bid"
            )}
            </Button>
        </form>
        )}
    </Formik>
  );
};
export default BidForm;