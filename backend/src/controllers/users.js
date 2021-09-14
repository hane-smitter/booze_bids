import json from 'body-parser';
import User from '../models/User.js';

//get users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//create user
export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user)
    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}