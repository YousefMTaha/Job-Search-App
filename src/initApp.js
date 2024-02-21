import { config } from "dotenv";
config();
import { dbConnection } from "../DB/dbConnection.js";
import userRoutes from "./modules/user/user.routes.js";
import companyRoutes from "./modules/company/company.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import { globalErrorHandling } from "./utils/asyncHandler.js";
import authRouter from "./modules/auth/auth.router.js";

export const initApp = (app, express) => {
  app.use(express.json());
  app.use("/users", userRoutes);
  app.use("/companies", companyRoutes);
  app.use("/jobs", jobRoutes);
  app.use("/auth", authRouter);

  //invalid routes
  app.use("*", (req, res, next) =>
    res.json({
      msg: ` the url ${req.originalUrl} or method ${req.method}  is invalid`,
    })
  );

  //connection db
  dbConnection();

  //global error handling
  app.use(globalErrorHandling);
};
