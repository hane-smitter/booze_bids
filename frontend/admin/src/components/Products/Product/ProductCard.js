import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography
} from '@mui/material';

import useStyles from '../styles';
import imgDefault from 'src/images/products/default.jpeg';

const ProductCard = ({ product, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card className={classes.root}>
        <CardHeader
            color="primary"
            subheader={product.name}
        />
        <CardActionArea>
            <CardMedia
                image={product.image ?? imgDefault}
                className={classes.media}
                title={product.name}
            />
            <CardContent>
                <Typography  variant="h5" component="h2">
                    RRP: KSH {product.cost}
                </Typography>
                
            </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className = {classes.flexWrap}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={_ => {
                    console.log('creATE bid btn clicked!!');
                    navigate('createbid', { state: product });
                }}
            >
                Create bid
            </Button>
        </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
