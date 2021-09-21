import mongoose from 'mongoose';
import Product from './Product.js';

const ProductBidDetailSchema = mongoose.Schema({
    bidPrice: {
        type: Number,
        required: true
    },
    targetAmount: Number,
    slots: {
        type: Number,
        required: true
    },
    extraSlots: {
        type: Number,
        required: true
    },
    extraCost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Inactive'],
            message: '{VALUE} is not supported'
        },
        default: 'Active'
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Product'
    }
},{ toJSON: { virtuals: true } }, {timestamps: true});

ProductBidDetailSchema.pre('validate', async function(next) {
    const product = await Product.findById(this.product);
    if(!product) throw new Error('This product does not exist');
    const prodBidDet = await ProductBidDetail.findOne({product: mongoose.Types.ObjectId(this.product)});
    if(prodBidDet) throw new Error('This product detail entry already exists');
    if(this.targetAmount < product.cost) throw new Error("Target Amount is less than cost of Product");
    const slots = Math.ceil(product.cost / this.bidPrice);
    const extraCost = (this.targetAmount - product.cost);
    const extraSlots = Math.ceil(extraCost / this.bidPrice);
    this.slots = slots;
    this.extraSlots = extraSlots;
    this.extraCost = extraCost;
    next();
});

ProductBidDetailSchema.virtual('totalslots').get(function () {
    return this.slots + this.extraSlots;
});

const ProductBidDetail = mongoose.model('ProductBidDetail', ProductBidDetailSchema);

export default ProductBidDetail;