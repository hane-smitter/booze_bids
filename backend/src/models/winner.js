import mongoose from 'mongoose';

const winnerSchema = mongoose.Schema({
    user: String, 
    bid: String, 
    delivered: {
        type: Number,
        default: 0
    },
    details: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Winner = mongoose.model('Winner', winnerSchema)

export default Winner;