import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import handleEmployeeRouter from "./routes/employee.router.js";
import attendanceRouter from "./routes/attendance.router.js";
import advanceRouter from "./routes/advance.router.js";
import salaryRouter from "./routes/salary.router.js";

app.use("/api/user", userRouter);
app.use("/api/employees", handleEmployeeRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/advance", advanceRouter);
app.use("/api/salary", salaryRouter);

export { app };
