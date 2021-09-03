import mongoose from 'mongoose';

const bidPaymentSchema = mongoose.Schema({
    amount: String, 
    bid: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const BidPayment = mongoose.model('BidPayment', bidPaymentSchema)

export default BidPayment;