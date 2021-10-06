import mongoose from 'mongoose';

const mpesaSchema = mongoose.Schema({
    phone: String, 
    merchant: String, 
    checkout: String,
    amount: String,
    bid: String,
    mpesaRef: String,
    name: String, 
    status: String, 
    description: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Mpesa = mongoose.model('Mpesa', mpesaSchema)

export default Mpesa;