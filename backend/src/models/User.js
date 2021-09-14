import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    surname: String, 
    othername: String, 
    phone: {
        type: String,
        unique: true,
        trim: true
    }, 
    password: String, 
    location: String, 
    latitude: String, 
    longitude: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

export default User;