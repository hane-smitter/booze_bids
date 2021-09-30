import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Chip,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";

import useStyles from "../styles";
import imgDefault from "src/images/products/default.jpeg";
import FutureTimeCalc from "src/utils/FutureTimeCalc";
import { Edit } from "react-feather";
import EditModal from "./modals/Edit";

const urlToFileObj = (url, name) => {
  let data = fetch(url)
    .then((response) => response.blob())
    .then((blob) => new File([blob], name, { type: blob.type }));
  return data;
};

const ProductCard = ({ product, setModalComponent, setShowModal, ...rest }) => {
  const classes = useStyles();
  
  const [time, setTime] = useState("00 Days 00 Hours 00 Mins 00 Secs");
  const [imgPrev, setImgPrev] = useState(null);
  const [imgObj, setImgObj] = useState("");

  function handleEdit(product) {
    setShowModal(true);
    setModalComponent(
      <EditModal product={product} setShowModal={setShowModal} imgPrev={imgPrev} setImgPrev={setImgPrev} imgObj={imgObj} />
    );
  }

  useEffect(() => {
    urlToFileObj(product.image, product.name).then((val) => {
      setImgObj(val);
      const reader = new FileReader();
      reader.readAsDataURL(val);

      reader.onload = () => {
        setImgPrev(reader.result);
      };
    });
    if (product.productbids[0]?.startTime) {
      let interval = setInterval(() => {
        setTime(
          FutureTimeCalc(
            product.productbids[0].startTime,
            product.productbids[0].endTime
          )
        );
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    
  }, []);
  return (
    <Card className={classes.root}>
      {product.productbids[0]?.startTime && (
        <Typography
          variant="body2"
          color="text.secondary"
        >{`Ends in: ${time}`}</Typography>
      )}
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.image ?? imgDefault}
          className={classes.media}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" color="primary">
            {product.name}
          </Typography>
          <Typography variant="h5" component="h2">
            RRP: KSH {product.cost}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.flexWrap} style={{ minHeight: "50px" }}>
        {product.productbidscount ? null : (
          <Chip label="No bid details created" color="warning" />
        )}
        <IconButton onClick={() => handleEdit(product)}>
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
