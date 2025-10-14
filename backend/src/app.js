import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

import userRouter from './routes/user.routes.js'

app.use(express.json());

app.use('/api/user' , userRouter)

export {app}