import ErrorResponse from "../../_helpers/error/ErrorResponse.js";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import unirest from "unirest";
import request from "request";
import https from "https";

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
//generate and send otp
export const generateOtp = async (req, res, next) => {
    const { id, phone } = req.body;
    try {
        // let param = {
        //     'username':'test',
        //     'api':'9HkbTre7xDoF6JjS',
        //     'phone':phone,
        //     'from':'TELESKY',
        //     'message':'Test message'
        // }
        // var postOptions = {
        //     host: "https://vas.teleskytech.com",
        //     path: '/api/sendsms',
        //     method: "POST",
        //     headers: {
        //     'Content-Type' : 'application/json',
        //     }        
        // }
        let data = req.body;
        let successMsg = {
          info: {
          message: "Verification code sent." ,
          severity: "success",
          code: "genotp"
          },
          payload: {data}
        }
        getToken(phone,id).then((body) => res.status(201).json( req.body )).catch((error) => 
        res.status(500).json( 'Error occured.' ))
        // res.status(201).json({ ca });
    } catch (error) {
        next(error);
    }
}
function getToken(phone,otp) {
    return new Promise((resolve, reject) => {
      unirest.post('https://vas.teleskytech.com/api/sendsms?from=Telesky&apiKey=9HkbTre7xDoF6JjS&username=test&message=Your verification code is: '+otp+'&phone='+phone)
        .headers({
          'Content-Type': 'application/json'
        })
        // .send('apiKey=9HkbTre7xDoF6JjS')
        // .send('username=test')
        // .send('phone='+phone)
        // .send('from=Telesky')
        // .send('message=test')
        .end(function (response) {
          if (response.error) {
            return reject(response.error)
          }
          return resolve(response.body);
        });
    })
  }
  
//verify and send otp
export const verifyOtp = async (req, res, next) => {
    const { phone } = req.body;
    try {
        
        res.status(200).json('success');
    } catch (error) {
        next(error);
    }
}