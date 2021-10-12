import crypto from "crypto";
import ErrorResponse from "../../_helpers/error/ErrorResponse.js";
import jwt from "jsonwebtoken";
import AuthUser from "../../models/AuthUser.js";
import { sendEmail } from "../utils/sendMail/sendMail.js";

export const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password)
      throw new ErrorResponse(
        "firsname, lastname, email password are required",
        400
      );
    const user = await AuthUser.create({
      firstname,
      lastname,
      email,
      password,
    });
    const token = await user.generateAuthToken();
    res.json({
      status: {
        info: {
          message: "Congratulations, your account is created successfully",
          severity: "success",
          code: "registeruser",
        },
        payload: { token },
      },
    });
  } catch (err) {
    next(err);
  }
};
export const registerAdmin = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password)
      throw new ErrorResponse(
        "firsname, lastname, email password are required",
        400
      );
    const user = await AuthUser.create({
      firstname,
      lastname,
      email,
      password,
      role: "Admin",
    });
    const token = await user.generateAuthToken();
    res.json({
      status: {
        info: {
          message: "Congratulations, Administrator account has been created",
          severity: "success",
          code: "registeradmin",
        },
        payload: { token },
      },
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new ErrorResponse("email and password are required", 400);
    const user = await AuthUser.findByCredentials(email, password);
    // const token = await user.generateAuthToken();
    const token = jwt.sign({ firstname: user.firstname, lastname: user.lastname, email: user.email, id: user._id }, 'test', { expiresIn: "1h" });

    res.json({
      status: {
        info: {
          message: "Login success! Redirecting...",
          severity: "success",
          code: "userlogin",
        },
        payload: { token },
      },
    });
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res, next) => {
  try {
    if (!req.token) throw new ErrorResponse("Unautorized", 401);
    req.admin.tokens = req.admin.tokens.filter(
      (token) => token.token !== req.token
    );
    /* await AuthUser.updateOne(
      { _id: req.admin._id },
      { $set: { tokens: req.admin.tokens } },
      { new: true, runValidators: true }
    ); */
    await req.admin.save();
    res.json({
      status: {
        info: {
          message: "logout success",
          severity: "success",
          code: "adminlogout",
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) throw new ErrorResponse("Email is required", 422);
    const user = await AuthUser.findOne({ email });
    if (!user) throw new ErrorResponse("Email not sent", 404);

    const resetToken = await user.getResetPasswordToken();

    const resetUrl = `${
      process.env.FRONTEND_APP_URL || "http://localhost:3000"
    }/passwordreset/${resetToken}`;

    const message = `
            <h1>You have requested a new password reset</h1>
            <p>Please go to this link to reset your password.</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>This password reset link will <strong>expire after ${
              process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS || 5
            } minutes.</strong></p>
        `;
    try {
      await sendEmail({
        to: user.email,
        text: message,
        subject: "Password reset request",
      });
      res.json({
        status: {
          info: {
            message:
              "An email has been sent to your email address. Check your email, and visit the link to reset your password",
            severity: "success",
            code: "forgotpassword",
          },
        },
      });
    } catch (err) {
      user.resetpasswordtoken = undefined;
      user.resetpasswordtokenexpire = undefined;
      await user.save();
      throw new ErrorResponse("Email not sent", 500);
    }
  } catch (err) {
    next(err);
  }
};

export const resetpassword = async (req, res, next) => {
  try {
    if (!req.params.resetToken || !req.body.password)
      throw new ErrorResponse("Could not reset password", 422);
    const resetpasswordtoken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
    const user = await AuthUser.findOne({
      resetpasswordtoken,
      resetpasswordtokenexpire: { $gt: Date.now() },
    });
    if (!user) throw new ErrorResponse("The reset link is invalid", 400);

    user.password = req.body.password;
    user.resetpasswordtoken = undefined;
    user.resetpasswordtokenexpire = undefined;

    await user.save();
    res.status(201).json({
      status: {
        info: {
          message: `Password reset successful.`,
          severity: "success",
          code: "passwordreset",
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
