import crypto from "crypto";

import AuthUser from "../models/AuthUser.js";
import { sendEmail } from "./utils/sendMail/sendMail.js";

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({
        err: [{ msg: "firsname, lastname, email password are required" }],
      });
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
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};
export const registerAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({
        err: [{ msg: "firsname, lastname, email password are required" }],
      });
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
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ err: [{ msg: "Email and password are required" }] });
    const user = await AuthUser.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.json({
      status: {
        info: {
          message: "login success",
          severity: "success",
          code: "userlogin",
        },
        payload: { token },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};
export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await AuthUser.updateOne(
      { _id: req.user._id },
      { $set: { tokens: req.user.tokens } },
      { new: true, runValidators: true }
    );
    res.json({
      status: {
        info: {
          message: "logout success",
          severity: "success",
          code: "userlogout",
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await AuthUser.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ err: [{ msg: "Email could not be sent" }] });

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
      console.log(err);
      return res
        .status(500)
        .json({ err: [{ msg: "Email could not be sent" }] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ msg: err.message }] });
  }
};

export const resetpassword = async (req, res) => {
  try {
    if (!req.params.resetToken || !req.body.password)
      throw new Error("Could not reset password");
    const resetpasswordtoken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
    const user = await AuthUser.findOne({
      resetpasswordtoken,
      resetpasswordtokenexpire: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({ err: [{ msg: "The reset link is invalid" }] });

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
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};
