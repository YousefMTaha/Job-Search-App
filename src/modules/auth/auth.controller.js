import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utils/mail.js";
export const signup = asyncHandler(async (req, res, next) => {
  const user = await userModel.create({
    ...req.body,
    password: bcryptjs.hashSync(req.body.password, +process.env.SALT_ROUND),
  });
  return res.status(200).json({ message: "done", user });
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({
    $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
  });

  if (!user || !bcryptjs.compareSync(req.body.password, user?.password))
    return next(new Error("invalid info", { cause: StatusCodes.BAD_REQUEST }));

  const token = jwt.sign({ _id: user._id }, process.env.SIGNATURE);
  user.status = "online";
  await user.save();
  return res.status(200).json({ message: "Done", token });
});

export const forgetMail = asyncHandler(async (req, res, next) => {
  const token = jwt.sign({ id: req.exist_user._id }, process.env.SIGNATURE);
  const link = `http://localhost:3000/auth/forgetPassword/${token}`;
  const html = `<a href="${link}">forget password</a>`;
  await sendMail({
    to: req.exist_user.email,
    subject: "Forget password mail",
    html,
  });
  return res.status(200).json({ message: "Done, check your email" });
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.SIGNATURE);
  const user = await userModel.findByIdAndUpdate(id, {
    password: bcryptjs.hashSync(req.body.newPassword, +process.env.SALT_ROUND),
  });
  if (!user)
    return next(new Error("user not found", { cause: StatusCodes.NOT_FOUND }));

  return res.status(200).json({ message: "done" });
});
