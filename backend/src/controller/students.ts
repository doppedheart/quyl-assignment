import { Request, Response } from "express";
import { db } from "../db";
import { Status } from "@prisma/client";

export class StudentController {
  async create(req: Request, res: Response) {
    try {
      const { name, cohort, status = "inactive" } = req.body;

      if (!name || !cohort) {
        return res.status(400).json({
          success: false,
          error: "Name and cohort are required",
        });
      }

      const student = await db.student.create({
        data: {
          name,
          cohort,
          status: status as Status,
        },
      });

      return res.status(201).json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.error("Error creating student:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to create student",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const students = await db.student.findMany({
        include: {
          courses: {
            include: {
              course: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch students",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const student = await db.student.findUnique({
        where: { id },
        include: {
          courses: {
            include: {
              course: true,
            },
          },
        },
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          error: "Student not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.error("Error fetching student:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch student",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, cohort, status, lastLogin } = req.body;

      const student = await db.student.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(cohort && { cohort }),
          ...(status && { status: status as Status }),
          ...(lastLogin && { lastLogin: new Date(lastLogin) }),
        },
        include: {
          courses: {
            include: {
              course: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.error("Error updating student:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to update student",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await db.studentCourse.deleteMany({
        where: { studentId: id },
      });

      const student = await db.student.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to delete student",
      });
    }
  }

  async enrollInCourse(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.params;

      const student = await db.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          error: "Student not found",
        });
      }

      const course = await db.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Course not found",
        });
      }

      const existingEnrollment = await db.studentCourse.findUnique({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
      });

      if (existingEnrollment) {
        return res.status(400).json({
          success: false,
          error: "Student is already enrolled in this course",
        });
      }

      const enrollment = await db.studentCourse.create({
        data: {
          studentId,
          courseId,
        },
        include: {
          course: true,
          student: true,
        },
      });

      return res.status(201).json({
        success: true,
        data: enrollment,
      });
    } catch (error) {
      console.error("Error enrolling student in course:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to enroll student in course",
      });
    }
  }

  async unenrollFromCourse(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.params;

      const enrollment = await db.studentCourse.delete({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
        include: {
          course: true,
          student: true,
        },
      });

      return res.status(200).json({
        success: true,
        data: enrollment,
      });
    } catch (error) {
      console.error("Error unenrolling student from course:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to unenroll student from course",
      });
    }
  }

  async getEnrolledCourses(req: Request, res: Response) {
    try {
      const { studentId } = req.params;

      const enrollments = await db.studentCourse.findMany({
        where: { studentId },
        include: {
          course: true,
        },
      });

      return res.status(200).json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch enrolled courses",
      });
    }
  }
}

export const studentController = new StudentController();
