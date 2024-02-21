import { StatusCodes } from "http-status-codes";
import companyModel from "../../../DB/models/company.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const isOwner = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // company id
  const { _id } = req.user; // hr id

  req.company = await companyModel.findById(id);

  if (!req.company) {
    return next(new Error("invalid id", { cause: StatusCodes.NOT_FOUND }));
  }

  if (req.company.companyHr.toString() != _id)
    return next(
      new Error("your not the owner", { cause: StatusCodes.FORBIDDEN })
    );

  next();
});
