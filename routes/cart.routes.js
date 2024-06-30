import { Router } from "express";
import CartController from "../controller/cart.controller.js";

const router = Router();

router.get("/cart", CartController);

export default router;
