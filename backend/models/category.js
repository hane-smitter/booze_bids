import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: String, 
    description: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Category = mongoose.model('Category', categorySchema)

export default Category;