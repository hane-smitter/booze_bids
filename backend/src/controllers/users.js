// import json from 'body-parser';
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = 'test';
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
    const { phone, password, latitude, longitude, surname, othername, location } = req.body;
    
    try {
        const oldUser = await User.findOne({ phone });
        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ phone, password: hashedPassword, latitude, longitude, surname, othername, location });

        const token = jwt.sign( { phone: result.phone, surname: result.surname, id: result._id }, secret, { expiresIn: "1h" } );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// loginUser
export const loginUser = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const oldUser = await User.findOne({ phone });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ phone: oldUser.phone, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}