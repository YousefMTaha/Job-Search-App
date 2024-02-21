import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import * as userValidator from "./user.validation.js";
import * as userController from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { isEmail, isMobileNum } from "../auth/auth.middleware.js";
import { isExist, isNotExist } from "../../middleware/isExist.js";
import userModel from "../../../DB/models/user.model.js";
const router = Router();

router.get("/", auth(), (req, res, next) =>
  res.status(200).json({ message: "done", user: req.user })
);

router.get(
  "/:_id",
  auth(),
  validation(userValidator.getProfile),
  isNotExist(userModel, "_id", "params"),
  (req, res, next) =>
    res.status(200).json({ message: "done", user: req.exist_user })
);

router.put(
  "/",
  auth(),
  validation(userValidator.update),
  isExist(userModel, "email"),
  isExist(userModel, "mobileNumber"),
  userController.update
);

router.put(
  "/password",
  auth(),
  validation(userValidator.updatePassword),
  userController.updatePassword
);
router.get(
  "/recovery",
  validation(userValidator.recovery),
  userController.recovery
);
router.delete("/", auth(), userController.remove);
export default router;
