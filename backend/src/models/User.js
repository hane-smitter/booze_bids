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

userSchema.statics.findOrCreate = async (phone) => {
    const user = await User.findOne({ phone });

    if(!!user)
        return user;

    const newUser = await new User({ phone });
    return newUser;

}

const User = mongoose.model('User', userSchema);

export default User;