import { Router } from "express";
import { createValidationFor, checkValidationResult } from "../utils/validator";
import { createUser } from "../controllers/user";

const router = Router();

/**
 * Resource handling user signup
 * @name router:/signup
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} createUser - Express path
 * @returns Response Object
 */

router.post(
  "/signup",
  createValidationFor("signup"),
  checkValidationResult,
  createUser
);

export default router;
