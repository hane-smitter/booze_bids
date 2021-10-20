import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { makeBid } from "../../../actions/products";
import { unsetErr } from "../../../actions/errors";
/* 
<Link to={location}>
        <CardMedia
          className={classes.media}
          image={product.product.image || defaultImg}
          title={product.product.name}
        />
      </Link>

*/

/* 
const location = {
    pathname: "/detail",
    state: { product },
  };
*/

const BidForm = ({product}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const userPhone = user ? user.result?.phone : '';
    const { err, loading, status } = useSelector((state) => state.app);
    const [nowLoading, setNowLoading] = useState(Boolean(false));

    let formFields = ["bidAmount", "bidder.phone"];
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
        id={"bid4m-" + product._id}
        initialValues={{
        bidAmount: product.bidPrice,
        bidder:{
            phone: userPhone,
        },
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
        // validationSchema={makeBidSchema}
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
                name="bidder.phone"
                placeholder="Phone Number"
                component={Input}
                size="small"
                type="number"
            />
                
            <Button
            type="submit"
            variant="contained"
            color="primary"
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