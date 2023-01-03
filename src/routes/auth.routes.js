import { Router } from "express";
import { singUp, signIn } from "../controllers/auth.controller";
import {
  checkExistingUser,
  checkExistingRoles,
} from "../middlewares/verifySignup";
const router = Router();

router.post("/signup", checkExistingUser, singUp);

router.post("/signin", signIn);

export default router;
