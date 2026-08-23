import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "https://haazri-lagao.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONT_END_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
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
