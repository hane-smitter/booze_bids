import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true,
        unique: true
    },
    category_slug: {
        type: String,
        required: true
    }, 
    description: String
}, { toJSON: {virtuals: true}, timestamps: true });


categorySchema.virtual('productsincategory',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

const Category = mongoose.model('Category', categorySchema)

export default Category;