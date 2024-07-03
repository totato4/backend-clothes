import { Router } from "express";
import CartController from "../controller/cart.controller.js";

const router = Router();

router.post("/getCart", CartController.getCart);
router.patch("/update", CartController.updateCart);

export default router;
