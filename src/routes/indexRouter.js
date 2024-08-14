import { Router } from "express";
import controller from "../controllers/indexController.js";

const router = Router();

router.get("/", controller.getIndex);
router.get("/:index", controller.getMessage);

export default router;
