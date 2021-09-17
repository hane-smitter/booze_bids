import mongoose from 'mongoose';

const storeSchema = mongoose.Schema({
    name: String, 
    type: String, 
    contact: String,
    mpesaType: String,
    mpesaAccountNo: String,
    mpesaNumber: Number,
    location: String, 
    latitude: String, 
    longitude: String, 
    description: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Store = mongoose.model('Store', storeSchema)

export default Store;