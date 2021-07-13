import { Router } from "express";
import SignupController from '../controller/SignupController';

const router = Router();

//login
router.post('/signupCliente', SignupController.signup);

export default router;