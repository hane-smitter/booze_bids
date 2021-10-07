import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import validator from "validator";
import bcrypt from "bcryptjs";
import ErrorResponse from "../_helpers/error/ErrorResponse.js";

const AuthUserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new ErrorResponse("Invalid Email", 422);
    },
  },
  role: {
    type: String,
    enum: {
      values: ["Admin", "User"],
      message: "{VALUE} is not supported",
    },
    default: "User",
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  tokens: [
    {
      token: { required: true, type: String },
    },
  ],
  resetpasswordtoken: String,
  resetpasswordtokenexpire: Date
});
AuthUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});
AuthUserSchema.statics.findByCredentials = async (email, password) => {
  const user = await AuthUser.findOne({ email });
  if (!user) throw new ErrorResponse("Wrong credentials", 400);
  const passwdMatch = await bcrypt.compare(password, user.password);
  // console.log(passwdMatch);
  if (!passwdMatch) throw new ErrorResponse("Wrong credentials", 400);
  return user;
};
AuthUserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};
AuthUserSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hash the reset token
    this.resetpasswordtoken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetpasswordtokenexpire = Date.now() + ((process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS || 5) * 60 * 1000);
    await this.save();
    return resetToken;
}

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);

export default AuthUser;
