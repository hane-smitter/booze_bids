import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import storeRoutes from './routes/stores.js';
import userRoutes from './routes/users.js';
import bidRoutes from './routes/bids.js';

const app = express();

app.use(cors());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/stores', storeRoutes);
app.use('/users', userRoutes);
app.use('/bids', bidRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

const CONNECTION_URL = "mongodb+srv://dennohdee:pr0gramm1ng@cluster0.z8y5v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);