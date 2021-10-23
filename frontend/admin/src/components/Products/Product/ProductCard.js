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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Box,
  Avatar
} from "@mui/material";

import useStyles from "../styles";
import imgDefault from "src/images/products/default.jpeg";
import FutureTimeCalc from "src/utils/FutureTimeCalc";
import { Edit } from "react-feather";
import EditModal from "./modals/Edit";
import moment from "moment";

const urlToFileObj = (url, name) => {
  let data = fetch(url)
    .then((response) => response.blob())
    .then((blob) => new File([blob], name, { type: blob.type }));
  return data;
};

const ProductCard = ({ product, setProduct, setImgPrev, setImgObj, toggle, ...rest }) => {
  const classes = useStyles();
  
  const [time, setTime] = useState("00 Days 00 Hours 00 Mins 00 Secs");
  const [imgPrevLocal, setImgPrevLocal] = useState(null);
  const [imgObjLocal, setImgObjLocal] = useState({});

  function handleEdit() {
    setProduct(product);
    toggle();
    setImgObj(imgObjLocal);
    setImgPrev(imgPrevLocal);
  }

  useEffect(() => {
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
  useEffect(() => {
    urlToFileObj(product.image, product.name).then((val) => {
      setImgObjLocal(val);
      const reader = new FileReader();
      reader.readAsDataURL(val);

      reader.onload = () => {
        setImgPrevLocal(reader.result);
      };
    });
  }, [product]);
  return (
    <TableRow>
      <TableCell> 
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Avatar
              src={product.image ?? imgDefault}
              sx={{ mr: 2 }}
            >
              {/* {getInitials(product.name)} */}
            </Avatar>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              {product.name}
            </Typography>
          </Box> 
      </TableCell>
      <TableCell>{product.cost}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>
      {product.productbids[0]?.startTime && (
        <Typography
          variant="body2"
          color="text.secondary"
        >{`Ends on: ${
          moment(product.productbids[0].endTime).format("DD/MM/YYYY HH:mm")
        }`}</Typography>
        )}
        {product.productbidscount ? null : (
          <Chip label="No active bid" color="warning" />
        )}
      </TableCell>
      <TableCell>{moment(product.createdAt).format("DD/MM/YYYY  HH:mm")}</TableCell>
      <TableCell>
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
