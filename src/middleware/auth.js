import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";

export const Role = {
  Company_HR: "Company_HR",
  User: "User",
};

export const auth = (roles = Object.values(Role)) => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(404).json({ msg: "token not found" });
    }
    if (!token.startsWith(process.env.BEARER_KRY)) {
      return res.status(400).json({ msg: "invalid token" });
    }

    const baseToken = token.split(process.env.BEARER_KRY)[1];
    const decoded = jwt.verify(baseToken, process.env.SIGNATURE);

    if (!decoded._id) {
      return res.status(400).json({ msg: "invalid token payload" });
    }
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    if (user.status == "offline") {
      return res.status(404).json({ msg: "please log in first" });
    }
    if (!roles.includes(user.role)) {
      return res.status(404).json({ msg: "not auth" });
    }
    req.user = user;
    next();
  };
};
