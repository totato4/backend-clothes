import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import AuthValidator from "../validators/Auth.js";

const router = Router();

router.post("/sign-in", AuthValidator.signIn, AuthController.signIn);
router.post("/sign-up", AuthValidator.signUp, AuthController.signUp);
router.post("/logout", AuthValidator.logOut, AuthController.logOut);
router.get("/refresh", AuthController.refresh);

export default router;
