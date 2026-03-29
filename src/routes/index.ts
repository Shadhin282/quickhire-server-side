import { Router } from "express";
import { JobsRoutes } from "../modules/Jobs/jobs.route";

const router = Router();

router.use('/jobs',JobsRoutes)

// Define your routes here
export const IndexRoutes = router;