import mongoose from 'mongoose';
import ProductBidDetail from './ProductBidDetail.js';
import Bid from './Bid.js';
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
    category_slug: {
        type: String,
        required: true
    }
}, { toJSON: {virtuals: true}, timestamps: true });

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

ProductSchema.pre('validate', async function(next) {
    try {
        const product = await Product.findOne({name: this.name});
        if (product) throw new Error("Product with this name already exists");
    } catch (err) {
        throw new Error(err.message);
    }
    next();
});

ProductSchema.pre('save', async function(next) {
    try {
        if(this.isModified('category')) {
            const category = await Category.findById(this.category);
            if (!category) throw new Error("Category not found");
            this.category_slug = category.category_slug;
        }
    } catch (err) {
        throw new Error(err.message);
    }
    next();
});

ProductSchema.post('findOneAndDelete', async function(doc, next) {
    try {
        if(!doc) throw new Error("No product has been fond");
        const bidDetail = await ProductBidDetail.deleteOne({ product: doc._id });
        console.log("prod details deleted successfully");
        console.log(bidDetail);
        const bids = await Bid.deleteMany({ product: doc._id });
        console.log("bids for the product deleted successfully");
        console.log(bids);
    } catch (err) {
        throw new Error(err.message);
    }
    next();
});

const Product = mongoose.model('Product', ProductSchema)

export default Product;