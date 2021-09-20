import React, { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Card,
  CardHeader,
  Container,
  Grid,
  Box,
  Button,
  TextField,
  CircularProgress,
  Grow,
  Divider,
  ListItem,
  Avatar,
  List,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import ImageIcon from "@material-ui/icons/Image";
import { useLocation } from "react-router";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../Nav";
import useStyles from "./styles.js";
import { makeBid, getProducts } from "../../../../actions/products";
import defaultImg from "../../../../images/products/defaultImg.jpeg";
import { unsetErr, unsetStatus } from "../../../../actions/errors";
import FutureTimeCalc from "../../FutureTimeCalc";

const Detail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const locationRouter = useLocation();
  const { product } = locationRouter.state;
  const { err, loading, status } = useSelector((state) => state.app);
  /* const [newBidder, setNewBidder] = useState(
    Boolean(status?.info?.code === "newbiddinguser")
  ); */
  const newBidder = Boolean(status?.info?.code === "newbiddinguser");

  console.log("STATUS OF FORM SUBMISSION");
  console.log(status);
  console.log("NEW BIDDER");
  console.log(newBidder);
  console.log(status?.info?.code === "newbiddinguser");
  console.log(Boolean(status?.info?.code === "newbiddinguser"));
  if(newBidder) window.scroll({top: 0, left: 0, behavior: 'smooth'});

  let formFields = ["bidAmount", "bidder.phone", "bidder.lastname", "bidder.firstname", "bidder.location"];
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
      phone: Yup.number("You phone number should be numerical").required("Phone number is required").integer(),
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
        then: Yup.string().required("Your location(e.g nearest town) is required"),
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
          (getIn(form.touched, name) && !!getIn(form.errors, name)) ||
          formErrorsName.indexOf(name) !== -1
        }
        helperText={
          (getIn(form.touched, name) && getIn(form.errors, name)) ||
          (formErrorsName.indexOf(name) !== -1 &&
            formErrors[formErrorsName.indexOf(name)].msg)
        }
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        variant="outlined"
        margin="normal"
        className={classes.rootTextField}
        fullWidth
        {...others}
      />
    );
  };

  useEffect(() => {
    window.shouldClearForm && delete window.shouldClearForm;
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    };
  }, []);
  useEffect(() => {
    if(window.shouldClearForm) {
      window.shouldClearForm(Boolean(status?.info?.code === "newbiddinguser"));
      delete window.shouldClearForm
    }
  }, [status]);
  

  return (
    <>
      <Container maxwidth="lg">
        <Navbar />
        <Grow in>
          <Container maxwidth="sm">
            <Grid container>
              <Grid item xs={12} md={6} className={classes.flex}>
                <Box className={classes.lightBox}>
                  <Card className={classes.cardRoot}>
                    <CardHeader
                      className={classes.capitalize}
                      color="primary"
                      subheader={product.product.name}
                    />
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component={"img"}
                        image={
                          product.product.image
                            ? product.product.image
                            : defaultImg
                        }
                        title={product.product.name}
                      />
                      <CardContent>
                        <Divider color="grey" />
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="p"
                          className={classes.warning}
                        >
                          {`Ends in: ${FutureTimeCalc()(
                            product.startTime,
                            product.endTime
                          )}`}
                        </Typography>

                        <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography variant="body2" component="p">
                              RRP: KSH {product.product.cost}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" component="p">
                              Slots Remaining:{" "}
                              {product.slots ? product.slots : 0}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} className={classes.flex}>
                <Box className={classes.darkBox}>
                  <Typography gutterBottom variant="h5">
                    Highest Bidder
                  </Typography>
                  {/*highest bidder  details*/}
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Thee Bidder" />
                      <ListItemText primary="Bidded: KES. 1000" />
                    </ListItem>
                  </List>
                  <Divider color="grey" />
                  <Typography gutterBottom variant="h5">
                    <b>{product.product.brand}</b>
                  </Typography>
                  <Typography gutterBottom variant="body2" color="inherit" component="p">
                    Place your bid Bid. Minimum Bid amount is {product.bidPrice}
                    /= . Enter phone number then standby to pay via Mpesa
                  </Typography>

                  <Formik
                  enableReinitialize={true}
                    initialValues={{
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
                    }}
                    onSubmit={function (values, actions) {
                      function shouldClearForm(newBidder = false) {
                        if(newBidder) {
                          actions.resetForm({ values });
                        } else {
                          actions.resetForm()
                        }
                      }
                      let currentCard = document.querySelector(
                        `#bid4m-${product._id}`
                        );

                        currentCard.dataset.id === product._id &&
                        dispatch(makeBid(values));
                        dispatch(getProducts());
                        window.shouldClearForm = shouldClearForm;
                        // actions.resetForm();

                        // newBidder && actions.resetForm({ values });
                      /* setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000); */
                    }}
                    validationSchema={makeBidSchema}
                  >
                    {(props) => (
                      <form
                        onSubmit={props.handleSubmit}
                        id={"bid4m-" + product._id}
                        autoComplete="off"
                        noValidate
                        data-id={product._id}
                      >
                        {newBidder ? (
                          <>
                            <Alert severity="info">Chances are high this could be your first bid. Just a littele more information and get your bid going.</Alert>
                            <Field
                              name="bidder.lastname"
                              label="surname name"
                              formErrors={formErrors}
                              formErrorsName={formErrorsName}
                              component={Input}
                            />
                            <Field
                              name="bidder.firstname"
                              label="other name"
                              formErrors={formErrors}
                              formErrorsName={formErrorsName}
                              component={Input}
                            />
                            <Field
                              name="bidder.location"
                              label="Your location"
                              formErrors={formErrors}
                              formErrorsName={formErrorsName}
                              component={Input}
                            />
                          </>
                        ) : null}
                        <Field
                          formErrors={formErrors}
                          formErrorsName={formErrorsName}
                          name="bidAmount"
                          label="Bid amount"
                          placeholder="for example 237"
                          autoFocus={!newBidder}
                          inputProps={{ min: product.bidPrice }}
                          type="number"
                          component={Input}
                        />
                        <Field
                          formErrors={formErrors}
                          formErrorsName={formErrorsName}
                          name="bidder.phone"
                          label="Phone number"
                          component={Input}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
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
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
};

export default Detail;
