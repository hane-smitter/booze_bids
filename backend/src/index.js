import express from 'express';
import cors from 'cors';
import path from 'path';

import { DB } from './db/mongoose.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import storeRoutes from './routes/stores.js';
import userRoutes from './routes/users.js';
import bidRoutes from './routes/bids.js';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 5000;


app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/stores', storeRoutes);
app.use('/users', userRoutes);
app.use('/bids', bidRoutes);


DB.on('connected', function() {
        console.log(chalk.rgb(208, 60, 240)('DB is connected'));
        app.listen(PORT, () => console.log(chalk.rgb(208, 60, 240)(`Server running on port: ${PORT}`)));
});
