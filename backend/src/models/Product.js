import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You need to provide a name'],
        trim: true,
        lowercase: true
    }, 
    brand: {
        type: String,
        trim: true
    },
    image: String,
    cost: {
        type: Number,
        default: 0,
        validate(val) {
            if(val < 0)
            throw new Error('Negative cost is not accepted!');
        }
    }, 
    store: String, 
    category: String,
}, {toJSON: {virtuals: true},timestamps: true});

ProductSchema.virtual('productbids',{
    ref: 'ProductBidDetail',
    localField: '_id',
    foreignField: 'product',
    match: {
        endTime: { $gt: new Date().toISOString() }
    }
});
ProductSchema.virtual('productbidscount',{
    ref: 'ProductBidDetail',
    localField: '_id',
    foreignField: 'product',
    count: true
});

const Product = mongoose.model('Product', ProductSchema)

export default Product;