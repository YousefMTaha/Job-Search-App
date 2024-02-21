import { StatusCodes } from "http-status-codes";
import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
export const update = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    message: "done",
    user: await userModel.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }),
  });
});

export const recovery = asyncHandler(async (req, res, next) => {
  const emails = await userModel
    .find({ recoveryEmail: req.body.recoveryEmail })
    .select("email -_id ");

  return !emails.length
    ? next(new Error("no emails associate", { cause: StatusCodes.BAD_REQUEST }))
    : res
        .status(200)
        .json({ message: "done", emails: emails.map((e) => e.email) });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;
  if (!bcryptjs.compareSync(oldPassword, req.user.password))
    return next(
      new Error("invalid old password", { cause: StatusCodes.BAD_REQUEST })
    );
  req.user.password = bcryptjs.hashSync(newPassword, +process.env.SALT_ROUND);
  await req.user.save();
  return res.status(200).json({ message: "Done" });
});

export const remove = asyncHandler(async (req, res, next) => {
  await req.user.deleteOne();
  return res.status(200).json({ message: "done" });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel
    .findById(id)
    .select("-password -createdAt -updatedAt -__v -recoveryEmail");
  return user
    ? res.status(200).json({ message: "done", user })
    : next(new Error("no user found", { cause: StatusCodes.NOT_FOUND }));
});
