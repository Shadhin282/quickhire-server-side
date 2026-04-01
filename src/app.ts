import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { notFound } from './middlewares/notFound';
import { IndexRoutes } from './routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes

app.use("/api/v1", IndexRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Quick Hire!');
});

app.use(notFound);

// Global error handler middleware - must be last
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error.message);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    data: null,
  });
});

export default app;
