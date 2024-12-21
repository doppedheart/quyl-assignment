import { Student } from "@/types/Student.types";

export const students: Student[] = [
  {
    name: "Anshuman Kashyap",
    cohort: "AY 2024-25",
    courses: [
      {
        student: {
          name: "Anshuman Kashyap",
          cohort: "AY 2024-25",
          status: "active",
        },
        studentId: "student-1",
        course: {
          name: "CBSE 9 Science",
          image:
            "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250",
        },
        courseId: "course-1",
        enrolledAt: "17. Nov, 2024",
      },
      {
        student: {
          name: "Anshuman Kashyap",
          cohort: "AY 2024-25",
          status: "active",
        },
        studentId: "student-1",
        course: {
          name: "CBSE 9 Math",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
        courseId: "course-2",
        enrolledAt: "17. Nov, 2024",
      },
    ],
    dateJoined: "17. Nov, 2024",
    lastLogin: "17. Nov, 2024 4:16 PM",
    status: "active",
  },
];
export const studentTableHeaders = [
  "Student Name",
  "Cohort",
  "Courses",
  "Date Joined",
  "Last login",
  "Status",
];
