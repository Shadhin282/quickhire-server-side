import express from 'express';
import { JobsController } from './jobs.controller';

const router = express.Router();

router.get('/', JobsController.getAllJobs);

export const JobsRoutes = router;
