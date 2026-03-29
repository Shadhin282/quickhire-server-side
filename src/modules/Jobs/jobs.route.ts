import express from 'express';
import { JobsController } from './jobs.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';

const router = express.Router();

router.get('/', JobsController.getAllJobs);
router.get('/:id', JobsController.getJobByid);
router.post('/',auth(UserRole.ADMIN), JobsController.createJob);
router.delete('/:id',auth(UserRole.ADMIN), JobsController.deleteJob);

export const JobsRoutes = router;
