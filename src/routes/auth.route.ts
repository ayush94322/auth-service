import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router();
const controller = new AuthController();

router.post("/register", validate(registerSchema), controller.register.bind(controller));
router.post("/login", validate(loginSchema), controller.login.bind(controller));

export default router;