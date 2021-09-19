import mongoose from 'mongoose';
import Category from './Category.js';

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You need to provide a name'],
        trim: true,
        set: capitalize
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
    category: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
}, { toJSON: {virtuals: true}, timestamps: true });

ProductSchema.pre('validate', async function(next) {
    const category = await Category.findById(this.category);
    if(!category) throw new Error('This Category does not exist');
    next();
});

function capitalize (val) {
    if (typeof val !== 'string') val = '';
    return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
}

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