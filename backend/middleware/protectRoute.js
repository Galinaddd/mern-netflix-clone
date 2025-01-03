import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token provided" });
    }
    const decoded = jwt.decode(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectionRoute middleware:" + error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
