import joi from "joi";
import { generalFiled } from "../../utils/generalField.js";
export const create = {
  body: joi
    .object({
      companyName: joi.string().min(3).max(100).trim().required(),
      description: joi.string().min(10).max(1000).trim().required(),
      industry: joi.string().min(3).max(50).trim().required(),
      address: joi.string().min(3).max(100).trim().required(),
      numberOfEmployees: joi
        .object({
          from: joi.number().positive().required(),
          to: joi.number().greater(joi.ref("from")).required(),
        })
        .required(),
      companyEmail: generalFiled.email.required(),
    })
    .required(),
  params: joi.object({}).required(),
  query: joi.object({}).required(),
};
export const update = {
  body: joi
    .object({
      companyName: joi.string().min(3).max(100).trim(),
      description: joi.string().min(10).max(1000).trim(),
      industry: joi.string().min(3).max(50).trim(),
      address: joi.string().min(3).max(100).trim(),
      numberOfEmployees: joi.object({
        from: joi.number().positive(),
        to: joi.number().greater(joi.ref("from")),
      }),
      companyEmail: generalFiled.email,
    })
    .required(),
  params: joi
    .object({
      id: generalFiled.id.required(),
    })
    .required(),
  query: joi.object({}).required(),
};
export const remove = {
  body: joi.object({}).required(),
  params: joi
    .object({
      id: generalFiled.id.required(),
    })
    .required(),
  query: joi.object({}).required(),
};

export const getCompanyData = {
  body: joi.object({}).required(),
  params: joi
    .object({
      id: generalFiled.id.required(),
    })
    .required(),
  query: joi.object({}).required(),
};

export const getCompanyName = {
  body: joi.object({}).required(),
  params: joi.object({}).required(),
  query: joi
    .object({
      companyName: joi.string().lowercase().trim().required(),
    })
    .required(),
};
