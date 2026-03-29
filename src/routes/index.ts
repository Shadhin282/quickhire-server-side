import { Router } from "express";
import { JobsRoutes } from "../modules/Jobs/jobs.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

router.use('/auth',AuthRoutes)
router.use('/jobs',JobsRoutes)

// Define your routes here
export const IndexRoutes = router;