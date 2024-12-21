import { getCourses } from "@/api/courses";
import { students } from "@/constants/dummy-students-data";
import { Course, Student } from "@/types/Student.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StudentState {
  students: Student[];
  courses: Course[];
}

export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await getCourses();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch courses");
    }
  }
);
const initialState: StudentState = {
  students: students,
  courses: [],
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students = [...state.students, action.payload];
    },
    addStudents: (state, action) => {
      state.students = action.payload;
    },
    deleteStudents: (state, action) => {
      state.students = state.students.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (_, action) => {
      console.error(action.payload);
    });
  },
});

export const { addStudent, addStudents, deleteStudents } = studentSlice.actions;

export default studentSlice.reducer;
