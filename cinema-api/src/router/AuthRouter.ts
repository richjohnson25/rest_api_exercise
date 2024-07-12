import { Router } from "express";

const router = Router()

import * as AuthController from '../controller/AuthController';

router.post('/auth/register', AuthController.RegisterUser)
router.get('/auth/login', AuthController.LoginUser)

export default router;