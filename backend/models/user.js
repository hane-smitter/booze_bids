import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    surname: String, 
    othername: String, 
    phone: String, 
    password: String, 
    location: String, 
    latitude: String, 
    longitude: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const User = mongoose.model('User', userSchema)

export default User;