import { enrollInCourse, getStudents } from "@/api/students";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { studentTableHeaders } from "@/constants/dummy-students-data";
import { formatDate, formatDateTime } from "@/lib/utils";
import { RootState } from "@/store/store";
import { addStudents, fetchCourses } from "@/store/students";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { EllipsisVertical } from "lucide-react";

export function StudentTable() {
  const { students, courses } = useSelector(
    (state: RootState) => state.student
  );
  const [loading, setLoading] = useState(true);
  const [studentList, setStudentList] = useState(students);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const { toast } = useToast();

  async function fetchStudents() {
    try {
      const response = await getStudents();
      console.log(response.data);
      setStudentList(response.data.data);
      dispatch(addStudents(response.data.data));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }
  const dispatch = useAppDispatch();
  const [isOpen, setOpenChange] = useState<boolean>(false);
  const handleCourseEnrollment = async (e: any, studentId: string) => {
    e.preventDefault();
    try {
      const response = await enrollInCourse(studentId, selectedCourseId);
      setStudentList((prev) => {
        return prev.map((student) => {
          if (student.id == studentId) {
            student.courses?.push(response.data);
          }
          return student;
        });
      });
      toast({
        title: "Success",
        description: "New course Added To Student Profile",
      });
      setOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(fetchCourses());
  }, [isOpen, dispatch]);
  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-14">
          {studentTableHeaders.map((header) => (
            <TableHead key={header} className="font-bold text-black">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentList.map((student) => (
          <TableRow key={student.name} className="h-12 hover:bg-gray-200">
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.cohort}</TableCell>
            <TableCell className="flex flex-row justify-between items-center pr-5">
              {student.courses && student.courses.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-background rounded-md hover:bg-gray-100">
                    <div className="w-6 h-6">
                      <img
                        src={student.courses[0].course.image}
                        width={24}
                        height={24}
                        className="object-fill"
                      />
                    </div>
                    <span>{student.courses[0].course.name}</span>
                  </div>
                  {student.courses.length > 1 && (
                    <div className="flex items-center gap-1 bg-background p-2 rounded-md hover:bg-gray-100">
                      <img
                        src={student.courses[1].course.image}
                        width={24}
                        height={24}
                        className="object-fill"
                      />
                      <span>{student.courses[1].course.name}</span>
                    </div>
                  )}
                  {student.courses.length > 2 && (
                    <div className="">
                      <p>...</p>
                    </div>
                  )}
                </div>
              )}
              <Dialog open={isOpen} onOpenChange={setOpenChange}>
                <DialogTrigger asChild>
                  <EllipsisVertical className="w-7 h-7 hover:bg-gray-200 rounded-md bg-gray-100 p-1" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Course</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="flex flex-col gap-5">
                    <Select
                      value={selectedCourseId}
                      onValueChange={setSelectedCourseId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((item) => {
                          return (
                            <SelectItem key={item.name} value={item.id!}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </DialogDescription>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={(e) => handleCourseEnrollment(e, student.id!)}
                    >
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell>{formatDate(student.dateJoined!)}</TableCell>
            <TableCell>{formatDateTime(student.lastLogin!)}</TableCell>
            <TableCell className="flex justify-center w-3/4 mt-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  student.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
