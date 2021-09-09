import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  TextField,
  Typography
} from '@material-ui/core';

import useStyles from './styles';

const ProductCard = ({ product, ...rest }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardHeader
            subheader="Ends in: 07 Days 19 Hours 45 Mins 53 Secs"
        />
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                {product.name}
                </Typography>
                <Typography  variant="h5" component="h2">
                    RRP: KSH {product.cost}
                </Typography>
                
            </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className = {classes.flexWrap}>
            <Typography variant="body2" color="textSecondary" component="p">
                Place your bid
                Bid costs only 30/= Enter your lowest unique bid amount and phone number then standby to pay via Mpesa
            </Typography>
            <div className={classes.inputWrapper}>
                <TextField variant="outlined" placeholder="for example 237" fullWidth/>
            </div>
            <div className={classes.inputWrapper}>
                <TextField variant="outlined" type="number" placeholder="your phone number" fullWidth />
            </div>
            <Button variant="contained" color='primary' fullWidth>Place your bid</Button>
        </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
