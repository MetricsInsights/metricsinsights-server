import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);

export default app;
