import { Router } from "express";
import AdminController from "../controller/admin.controller";

const router = Router();

router.post("/populate-clothes", AdminController.populateClothesTable);
// router.get("/admin/myclothes", AdminController.getAllClothes);

export default router;
