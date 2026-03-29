import express, { Application, Request, Response } from 'express';
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

export default app;
