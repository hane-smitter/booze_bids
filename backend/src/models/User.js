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
}, { toJSON: { virtuals: true } }, { timestamps: true });

userSchema.statics.findOrCreate = async (bidder = {}) => {

    const user = await User.findOne({ phone: bidder.phone });
    if(!user && !bidder.acknowledgeNew) {
      return "NEW";
    } else if((!user && bidder.acknowledgeNew)) {
        delete bidder.acknowledgeNew;
        let newBidder = {
            phone: bidder.phone,
            surname: bidder?.lastname,
            othername: bidder?.firstname,
            password: bidder?.password,
            location: bidder?.location
        }
        const newUser = await new User(newBidder).save();
        return newUser;
    }

    return user;
}

userSchema.virtual('fullname').get(function () {
    return `${this.othername} ${this.surname}`;
});

const User = mongoose.model('User', userSchema);

export default User;