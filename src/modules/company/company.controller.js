import { StatusCodes } from "http-status-codes";
import companyModel from "../../../DB/models/company.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
  req.body.companyHr = req.user._id;
  const company = await companyModel.create(req.body);
  return res.status(200).json({ message: "Done", company });
});

export const update = asyncHandler(async (req, res, next) => {
  const company = await companyModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.status(200).json({ message: "Done", company });
});

export const remove = asyncHandler(async (req, res, next) => {
  await req.company.deleteOne();
  return res.status(200).json({ message: "Done" });
});

export const getCompanyData = asyncHandler(async (req, res, next) => {
  const company = await companyModel.findById(req.params.id);
  return company
    ? res.status(200).json({ message: "done", company })
    : next(new Error("invalid company id", { cause: StatusCodes.NOT_FOUND }));
});

export const getCompanyName = asyncHandler(async (req, res, next) => {
  const company = await companyModel.find({
    companyName: { $regex: req.query.companyName },
  });
  return company.length
    ? res.status(200).json({ message: "done", company })
    : next(new Error("no company found", { cause: StatusCodes.NOT_FOUND }));
});
