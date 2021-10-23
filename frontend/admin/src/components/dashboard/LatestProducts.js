import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const LatestProducts = (props) => (
  <Card {...props}>
    
      <CardHeader
        subtitle={`latest`}
        title="Latest Products"
      />
      <Divider />
      {props.products?.length ?
      <>
      <List>
        {props.products.map((product, i) => (
          <ListItem
            divider={i < props.products.length - 1}
            key={product._id}
          >
            <ListItemAvatar>
              <img
                alt={product?.name}
                src={product?.image}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Added ${moment(product.createdAt).fromNow()}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onclick={navigate('/app/products')}
        >
          View all
        </Button>
      </Box> */}
    
    </>
    :
    <Box>
      <Typography>
        No Latest Products
      </Typography>
    </Box>
    }
    </Card>
);

export default LatestProducts;
