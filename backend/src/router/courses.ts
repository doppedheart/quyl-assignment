import express from "express";
import { courseController } from "../controller/courses";

const router = express.Router();

router.post("/", courseController.create);
router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);

export default router;
