import { Router } from "express";
import ClothesController from "./../controller/clothes.controller.js";

const router = Router();

router.get("/clothes", ClothesController.getClothes);

export default router;
