import React, {useState, useEffect} from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import FutureTimeCalc from "../FutureTimeCalc";

const Product = ({ calcTime, product }) => {
  const classes = useStyles();
  
  const location = {
    pathname: "/detail",
    state: { product },
  };

  const [ countDownTime, setCountDownTime ] = useState(0);

  useEffect(() => {
    let interval = setInterval(upDateTime(), 1000);
    return () => clearInterval(interval);
  });

  function upDateTime() {
    setCountDownTime(FutureTimeCalc()(product.startTime, product.endTime));
  }

  return (
    <Button component={Link} to={location}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.capitalize}
          color="primary"
          subheader={product.product.name}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.product.image ? product.product.image : defaultImg}
            title={product.product.name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              className={classes.warning}
            >
              {`Ends in: ${countDownTime}`}
            </Typography>
            <Typography variant="caption" component="p">
              Bid me at #kes {product.bidPrice} | Slots: {product.slots ?? 0}
            </Typography>
            <Typography component="div" variant="h5" style={{ fontWeight: "bold" }}>
              RRP: KSH {product.product.cost}
            </Typography>
            
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>
  );
};

export default Product;
