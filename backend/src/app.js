import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

import userRouter from './routes/user.routes.js';
import handleEmployeeRouter from './routes/employee.router.js';
import attendanceRouter from './routes/attendance.router.js';
import advanceRouter from './routes/advance.router.js';

app.use('/api/user' , userRouter)
app.use('/api/employees' , handleEmployeeRouter)
app.use('/api/attendance' , attendanceRouter)
app.use('/api/advance' , advanceRouter)

export {app}