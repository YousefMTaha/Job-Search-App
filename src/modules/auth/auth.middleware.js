import { StatusCodes } from "http-status-codes";
import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const isEmail = asyncHandler(async (req, res, next) => {
  if (await userModel.findOne({ email: req.body.email }))
    return next(
      new Error("Email already exist", { cause: StatusCodes.CONFLICT })
    );
  next();
});

export const isMobileNum = asyncHandler(async (req, res, next) => {
  if (await userModel.findOne({ mobileNumber: req.body.mobileNumber }))
    return next(
      new Error("Phone already exist", { cause: StatusCodes.CONFLICT })
    );

  next();
});
