import express from 'express';
import { JobsController } from './jobs.controller';

const router = express.Router();

router.get('/', JobsController.getAllJobs);
router.get('/:id', JobsController.getJobByid);

export const JobsRoutes = router;
