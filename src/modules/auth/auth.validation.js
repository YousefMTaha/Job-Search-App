import joi from "joi";
import { generalFiled } from "../../utils/generalField.js";

export const signup = {
  body: joi
    .object({
      firstName: generalFiled.name.required(),
      lastName: generalFiled.name.required(),
      email: generalFiled.email.required(),
      recoveryEmail: generalFiled.email.required(),
      mobileNumber: generalFiled.phone.required(),
      password: generalFiled.password.required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
      role: joi.string().valid("User", "Company_HR"),
      DOB: joi.date().max(Date.now()),
    })
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};

export const login = {
  body: joi
    .object({
      email: generalFiled.email,
      mobileNumber: generalFiled.phone,
      password: generalFiled.password.required(),
    })
    .xor("email", "mobileNumber")
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};

export const forgetMail = {
  body: joi
    .object({
      email: generalFiled.email,
    })
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};

export const forgetPassword = {
  body: joi
    .object({
      newPassword: generalFiled.password.required(),
    })
    .required(),
  params: joi
    .object({
      token: joi.string().required(),
    })
    .required(),
  query: joi.object({}).required(),
};
