import { Router } from "express";
import * as authController from "./auth.controller.js";
import * as authValidator from "./auth.validation.js";
import { validation } from "../../middleware/validation.js";
import { isExist, isNotExist } from "../../middleware/isExist.js";
import userModel from "../../../DB/models/user.model.js";
const router = Router();

router.post(
  "/",
  validation(authValidator.signup),
  isExist(userModel, "email"),
  isExist(userModel, "mobileNumber"),
  authController.signup
);

router.post(
  "/forget-mail",
  validation(authValidator.forgetMail),
  isNotExist(userModel, "email"),
  authController.forgetMail
);

router.put(
  "/forgetPassword/:token",
  validation(authValidator.forgetPassword),
  authController.forgetPassword
);

router.post("/login", validation(authValidator.login), authController.login);
export default router;
