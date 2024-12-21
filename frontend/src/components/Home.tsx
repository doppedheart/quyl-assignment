import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentTable } from "@/components/student-table";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label, LabelInputContainer } from "./ui/label";
import { createStudent } from "@/api/students";
import { useToast } from "@/hooks/use-toast";

export function Home() {
  const [name, setName] = useState<string>("");
  const [cohort, setCohort] = useState<string>("");
  const { toast } = useToast();
  const handleAddStudent = async (e: any) => {
    e.preventDefault();
    try {
      const response = await createStudent({
        name,
        cohort,
        status: "inactive",
      });
      console.log(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.error,
      });
    }
  };

  return (
    <div className="bg-primary flex flex-col mx-5 p-4 rounded-lg gap-10">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select defaultValue="2024-25">
            <SelectTrigger className="w-[149px] h-10 bg-[#E9EDF1]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">AY 2024-25</SelectItem>
              <SelectItem value="2023-24">AY 2023-24</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="cbse9">
            <SelectTrigger className="w-[148px] h-10 bg-[#E9EDF1]">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbse9">CBSE 9</SelectItem>
              <SelectItem value="cbse10">CBSE 10</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#E9EDF1] text-[#3F526E] text-base font-bold h-10 ">
              <Plus className="w-5 h-5" /> Add new Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fill Student Details</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-5">
              <LabelInputContainer>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={name}
                  placeholder="Eg. John Sharma"
                  onChange={(e) => setName(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label>Cohort</Label>
                <Input
                  type="text"
                  value={cohort}
                  placeholder="Eg. Ay 2024-2025"
                  onChange={(e) => setCohort(e.target.value)}
                />
              </LabelInputContainer>
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={(e) => handleAddStudent(e)}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <StudentTable />
    </div>
  );
}
