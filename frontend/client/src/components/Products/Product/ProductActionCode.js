<CardActions className={classes.flexWrap}>
        <Typography variant="body2" color="textSecondary" component="p">
          Place your bid Bid costs only {product.bidPrice}/= Enter your lowest
          unique bid amount and phone number then standby to pay via Mpesa
        </Typography>

        <Formik
          initialValues={{
            bidAmount: "",
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
                color="primary"
                fullWidth
              >
                {nowLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Place your bid"
                )}
              </Button>
            </form>
          )}
        </Formik>
      </CardActions>