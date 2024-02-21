import { generalFiled } from "../../utils/generalField.js";
import joi from "joi";
export const update = {
  body: joi
    .object({
      firstName: generalFiled.name,
      lastName: generalFiled.name,
      email: generalFiled.email,
      recoveryEmail: generalFiled.email,
      mobileNumber: generalFiled.phone,
      role: joi.string().valid("User", "Company_HR"),
      DOB: joi.date().max(Date.now()),
    })
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};

export const recovery = {
  body: joi
    .object({
      recoveryEmail: generalFiled.email.required(),
    })
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};

export const updatePassword = {
  body: joi
    .object({
      newPassword: generalFiled.password.required(),
      confirmNewPassword: joi.string().valid(joi.ref("newPassword")).required(),
      oldPassword: generalFiled.password.required(),
    })
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};

export const getProfile = {
  body: joi.object({}).required(),
  params: joi
    .object({
      _id: generalFiled.id.required(),
    })
    .required(),
  query: joi.object({}).required(),
};
