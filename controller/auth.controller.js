import AuthService from "../services/Auth.js";
import ErrorsUtils from "../utils/Errors.js";
import { COOKIE_SETTINGS } from "../constants.js";

class AuthController {
  static async getUserInfo(req, res) {
    const accessToken = req.body;
    try {
      const userData = await AuthService.getUserInfo(accessToken);
      return res.status(200).json(userData);
    } catch (err) {
      return res
        .status(500)
        .json("Не удалось получить информацию о пользователе.");
    }
  }

  static async signIn(req, res) {
    const { userName, password } = req.body;
    try {
      const { accessToken, refreshToken, accessTokenExpiration, id } =
        await AuthService.signIn({ userName, password });
      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res
        .status(200)
        .json({ accessToken, accessTokenExpiration, userName, id });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req, res) {
    const { userName, password, role } = req.body;
    try {
      const { accessToken, refreshToken, accessTokenExpiration, id } =
        await AuthService.signUp({ userName, password, role });
      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res
        .status(200)
        .json({ accessToken, accessTokenExpiration, userName, id });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;
    try {
      await AuthService.logOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const currentRefreshToken = req.cookies.refreshToken;
    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.refresh({
          currentRefreshToken,
        });
      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      console.log("PASSED");
      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
