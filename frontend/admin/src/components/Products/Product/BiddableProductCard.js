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
import { format, parseISO } from 'date-fns';

import useStyles from '../styles';
import imgDefault from 'src/images/products/default.jpeg';

const BiddableProductCard = ({ product, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card className={classes.root}>
        <CardHeader
            subheader="Ends in: 07 Days 19 Hours 45 Mins 53 Secs"
        />
        <CardActionArea>
            <CardMedia
                image={product.product.image ?? imgDefault}
                className={classes.media}
                title={product.product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                {product.product.name}
                </Typography>
                <Typography  variant="h5" component="h2">
                    RRP: KSH {product.product.cost}
                </Typography>
                <Typography  variant="caption" component="p">
                    Bid price: KSH {product.bidPrice}
                </Typography>
                <Typography  variant="caption" component="p">
                    Target Amount: KSH {product.targetAmount}
                </Typography>
                <Typography  variant="caption" component="p" color="text.secondary">
                    Starting Time: {format(parseISO(product.startTime), 'dd/MM/yyyy HH:mm:ss')}
                </Typography>
                <Typography  variant="caption" component="p" color="text.secondary">
                End Time: {format(parseISO(product.endTime), 'dd/MM/yyyy HH:mm:ss')}
                </Typography>
                
            </CardContent>
        </CardActionArea>
    </Card>
  );
};

BiddableProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default BiddableProductCard;
