import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isExist = (model, field, reqField = "body") => {
  return asyncHandler(async (req, res, next) => {
    const filter = {};
    filter[field] = req[reqField][field]; // => { email:req.body.email}
    if (await model.findOne(filter))
      return next(
        new Error(`${field} already exist`, { cause: StatusCodes.CONFLICT })
      );
    next();
  });
};

export const isNotExist = (model, field, reqField = "body") => {
  return asyncHandler(async (req, res, next) => {
    const filter = {};
    const modelName = "exist" + "_" + model.modelName.toLowerCase();
    filter[field] = req[reqField][field]; // => { email:req.body.email}
    req[modelName] = await model.findOne(filter);
    if (!req[modelName])
      return next(
        new Error(`${model.modelName} ${field} not found`, {
          cause: StatusCodes.NOT_FOUND,
        })
      );
    next();
  });
};
