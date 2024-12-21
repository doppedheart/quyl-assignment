import { Router } from "express";
import { studentController } from "../controller/students";

const router = Router();

router.post("/", studentController.create);
router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);
router.get("/:studentId/courses", studentController.getEnrolledCourses);
router.post("/:studentId/courses/:courseId", studentController.enrollInCourse);
router.delete(
  "/:studentId/courses/:courseId",
  studentController.unenrollFromCourse
);

export default router;
