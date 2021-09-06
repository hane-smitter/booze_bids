import mongoose from 'mongoose';
import chalk from 'chalk';

const CONNECTION_URL = process.env.MONGODB;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, chalk.italic.red.inverse('MongoDB connection error:')));

export const DB = mongoose.connection;
