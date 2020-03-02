import { Router } from "express";
import { createValidationFor, checkValidationResult } from "../utils/validator";
import { askQuestion, viewQuestions } from "../controllers/question";
import auth from "../middlewares/auth";

const router = Router();

/**
 * Resource handling user signup
 * @name router:/question
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} askQuestion - Express path
 * @returns Response Object
 */

router.post(
  "/",
  auth,
  createValidationFor("question"),
  checkValidationResult,
  askQuestion
);

/**
 * Resource handling user signup
 * @name router:/question
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} viewQuestions - Express path
 * @returns Response Object
 */

router.get("/", viewQuestions);

export default router;
