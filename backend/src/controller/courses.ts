import { Request, Response } from "express";
import { db } from "../db";

export class CourseController {
  async create(req: Request, res: Response) {
    try {
      const { name, image } = req.body;

      if (!name || !image) {
        return res.status(400).json({
          success: false,
          error: "Name and image are required",
        });
      }

      const course = await db.course.create({
        data: {
          name,
          image,
        },
      });

      return res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to create course",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const courses = await db.course.findMany({
        include: {
          students: {
            include: {
              student: true,
            },
          },
          _count: {
            select: { students: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch courses",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const course = await db.course.findUnique({
        where: { id },
        include: {
          students: {
            include: {
              student: true,
            },
          },
          _count: {
            select: { students: true },
          },
        },
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Course not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch course",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, image } = req.body;

      const course = await db.course.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(image && { image }),
        },
        include: {
          students: {
            include: {
              student: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to update course",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await db.studentCourse.deleteMany({
        where: { courseId: id },
      });

      const course = await db.course.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to delete course",
      });
    }
  }
}

export const courseController = new CourseController();
