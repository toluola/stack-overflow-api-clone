import { Router } from "express";
import { createValidationFor, checkValidationResult } from "../utils/validator";

const router = Router();

router.post(
  "/signup",
  createValidationFor("signup"),
  checkValidationResult,
  createUser
);

export default router;
