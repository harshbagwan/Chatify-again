import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

// this socket is the user that is connected from the frontend -- so this our socket connection
export const socketAuthMiddleware = async (socket, next) => {
  try {
    const rawCookies = socket.handshake.headers.cookie;
    if (!rawCookies) {
      console.log("Socket connection rejected: No cookies provided");
      return next(new Error("Unauthorized - No Cookies Provided"));
    }

    // Parse all cookies safely, handling any spacing or cookie ordering
    const parsedCookies = {};
    rawCookies.split(";").forEach((cookieStr) => {
      const parts = cookieStr.trim().split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join("=").trim();
        parsedCookies[key] = value;
      }
    });

    const token = parsedCookies.jwt;

    if (!token) {
      console.log("Socket connection rejected: No jwt token in cookies");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // find the user from db
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`,
    );
    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
