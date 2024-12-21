export interface Student {
  id?: string;
  name: string;
  cohort: string;
  courses?: StudentCourse[];
  dateJoined?: string;
  lastLogin?: string;
  status: "active" | "inactive";
}

export interface StudentCourse {
  student: Student;
  studentId: string;
  course: Course;
  courseId: string;
  enrolledAt?: string;
}

export interface Course {
  id?: string;
  name: string;
  image: string;
  students?: StudentCourse[];
  createdAt?: string;
  updatedAt?: string;
}
