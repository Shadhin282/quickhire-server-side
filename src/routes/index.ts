import { Router } from "express";
import { JobsRoutes } from "../modules/Jobs/jobs.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ApplicationRoutes } from "../modules/Application/application.route";

const router = Router();

router.use('/auth',AuthRoutes)
router.use('/jobs',JobsRoutes)
router.use('/applications',ApplicationRoutes)

// Define your routes here
export const IndexRoutes = router;