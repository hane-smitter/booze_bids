import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import defaultImg from "../../../images/products/defaultImg.jpeg";
import { Link } from "react-router-dom";

const Product = ({ calcTime, product }) => {
  const classes = useStyles();
  
  const location = {
    pathname: "/detail",
    state: { product },
  };

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
              {`Ends in: ${calcTime(product.startTime, product.endTime)}`}
            </Typography>
            <Typography variant="p" component="p">
              RRP: KSH {product.product.cost}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>
  );
};

export default Product;
