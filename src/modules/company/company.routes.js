import { Router } from "express";
import companyEndpoint from "./company.endpoint.js";
import { isExist } from "../../middleware/isExist.js";
import { auth } from "../../middleware/auth.js";
import companyModel from "../../../DB/models/company.model.js";
import * as companyController from "./company.controller.js";
import * as companyValidation from "./company.validation.js";
import { validation } from "../../middleware/validation.js";
import { isOwner } from "./company.middleware.js";
const router = Router();

router.post(
  "/",
  auth(companyEndpoint.CRUDoperation),
  validation(companyValidation.create),
  isExist(companyModel, "companyName"),
  isExist(companyModel, "companyEmail"),
  companyController.create
);

router.put(
  "/:id",
  auth(companyEndpoint.CRUDoperation),
  validation(companyValidation.update),
  isOwner,
  isExist(companyModel, "companyName"),
  isExist(companyModel, "companyEmail"),
  companyController.update
);

router.delete(
  "/:id",
  auth(companyEndpoint.CRUDoperation),
  validation(companyValidation.remove),
  isOwner,
  companyController.remove
);

router.get(
  "/companyName",
  auth(),
  validation(companyValidation.getCompanyName),
  companyController.getCompanyName
);

router.get(
  "/:id",
  auth(companyEndpoint.CRUDoperation),
  validation(companyValidation.getCompanyData),
  companyController.getCompanyData
);
export default router;
