import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Forbidden, Unauthorized } from "../utils/Errors.js";

dotenv.config();

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, "access_naruto", {
      expiresIn: "30m",
    });
  }
  // process.env.ACCESS_TOKEN_SECRET

  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, "refresh_sasuke", {
      expiresIn: "15d",
    });
  }
  // process.env.REFRESH_TOKEN_SECRET

  static async checkAccess(req, _, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return next(new Unauthorized());
    }
    try {
      req.user = await TokenService.verifyAccessToken(token);
    } catch (error) {
      return next(new Forbidden(error));
    }
    next();
  }
  static async verifyAccessToken(accessToken) {
    return await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }
  static async verifyRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }
}

export default TokenService;
