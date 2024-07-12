import { Router } from "express";

const router = Router()

import * as MovieController from '../controller/MovieController';

router.get('/', MovieController.GetMovies)

export default router;