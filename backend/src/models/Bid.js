import mongoose from 'mongoose';

const BidSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bidPrice: {
        required: true,
        type: Number
    },
    bidAmount: {
        type: [Number],
        required: true
    },
    bidAmountTotal: Number,
    bidsCount: {
        type: Number,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { toJSON: {virtuals: true}, timestamps: true });

BidSchema.post('validate', function(bid, next) {
    let bidAmountArr = bid.bidAmount;
    bid.bidAmountTotal = bidAmountArr.reduce((prev, curr) => prev + curr);
    next();
});

BidSchema.virtual('bidderuser',{
    ref: 'User',
    localField: 'user',
    foreignField: '_id'
});

const Bid = mongoose.model('Bid', BidSchema)

export default Bid;