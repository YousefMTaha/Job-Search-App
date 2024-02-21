import joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value, helper) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("invalid id");
};

export const generalFiled = {
  name: joi.string().min(3).max(20),
  email: joi
    .string()
    .email({ tlds: { allow: ["outlook", "com"] }, minDomainSegments: 2 }),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  phone: joi.string().regex(/^01[0-2,5]{1}[0-9]{8}$/),
  file: joi.object().keys({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
  id: joi.string().custom(objectIdValidation),
};

export const headers = {
  headers: joi.object({
    "cache-control": joi.string(),
    "postman-token": joi.string(),
    "content-type": joi.string(),
    "content-length": joi.string(),
    host: joi.string(),
    "user-agent": joi.string(),
    accept: joi.string(),
    "accept-encoding": joi.string(),
    connection: joi.string(),
    token: joi.string().required(),
  }),
};
