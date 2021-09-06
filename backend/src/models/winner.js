import mongoose from 'mongoose';

const winnerSchema = mongoose.Schema({
    user: String, 
    bid: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Winner = mongoose.model('Winner', winnerSchema)

export default Winner;