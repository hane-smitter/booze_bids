import ErrorResponse from "../../_helpers/error/ErrorResponse.js";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = 'test';
//get users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
      next(error);
    }
}
//create user
export const createUser = async (req, res, next) => {
    const { phone, password, latitude, longitude, surname, othername, location } = req.body;
    
    try {
        const oldUser = await User.findOne({ phone });
        if (oldUser) throw new ErrorResponse('User already exists', 400);

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ phone, password: hashedPassword, latitude, longitude, surname, othername, location });

        const token = jwt.sign( { phone: result.phone, surname: result.surname, id: result._id }, secret, { expiresIn: "1h" } );

        res.status(201).json({ result, token });
    } catch (error) {
      next(error);
    }
}
// loginUser
export const loginUser = async (req, res, next) => {
    const { phone, password } = req.body;
    try {
        const oldUser = await User.findOne({ phone });

        if (!oldUser) throw new ErrorResponse('User doesn-t exist', 404);

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) throw new ErrorResponse('Invalid credentials', 400);

        const token = jwt.sign({ phone: oldUser.phone, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        next(error);
    }
}