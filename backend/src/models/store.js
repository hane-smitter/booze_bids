import mongoose from 'mongoose';

const storeSchema = mongoose.Schema({
    name: String, 
    typ: String, 
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