/**
 * Express app setup. Configures middleware, routes, and app-level settings.
 */

import express from 'express';
import cors from 'cors';
import citiesRouter from './routes/cities';
import authRouter from './routes/auth';
import blogRouter from './routes/blog';
import { initializeDatabase } from './config/db';

const app = express();

// Initialize database connection
initializeDatabase();

app.use(cors());
app.use(express.json());

app.use('/api/cities', citiesRouter);
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
