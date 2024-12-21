import express from "express";
import { PORT } from "./config";
import cors from "cors";
import studentRouter from "./router/students";
import courseRouter from "./router/courses";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("health check ok");
});

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/course", courseRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
