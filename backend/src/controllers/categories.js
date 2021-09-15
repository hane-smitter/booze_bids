import Category from "../models/Category.js";
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        console.log(categories);
        res.json(categories);
    } catch (error) {
        res.status(500).json({err: [{error: "Server is temporarily down!"}]});
    }
}

//create category
export const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = new Category(category)
    try {
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json({err: [{error: "Server is temporarily down!"}]});
    }
}