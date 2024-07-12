import { Router } from "express";
import AuthRouter from './AuthRouter';
import MovieRouter from './MovieRouter';

const router = Router()

router.use('/auth', AuthRouter)
router.use('/movies', MovieRouter)

export default router