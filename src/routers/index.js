import { Router } from "express";
import { createValidationFor, checkValidationResult } from "../utils/validator";
import { createUser, loginUser } from "../controllers/user";
import {
  askQuestion,
  viewQuestions,
  viewSingleQuestion,
  voteQuestion
} from "../controllers/question";
import { postAnswer } from "../controllers/answer";
import auth from "../middlewares/auth";

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
  "auth/signup",
  createValidationFor("signup"),
  checkValidationResult,
  createUser
);

/**
 * Resource handling user login
 * @name router:/login
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} loginUser - Express path
 * @returns Response Object
 */

router.post(
  "auth/login",
  createValidationFor("login"),
  checkValidationResult,
  loginUser
);

/**
 * Resource handling asking a question
 * @name router:/question
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} askQuestion - Express path
 * @returns Response Object
 */

router.post(
  "/question",
  auth,
  createValidationFor("question"),
  checkValidationResult,
  askQuestion
);

/**
 * Resource handling viewing questions
 * @name router:/questions
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} viewQuestions - Express path
 * @returns Response Object
 */

router.get("/questions", viewQuestions);

/**
 * Resource handling viewing single question
 * @name router:/questions/:questionId
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} viewQuestions - Express path
 * @returns Response Object
 */

router.get("/questions/:questionId", viewSingleQuestion);

/**
 * Resource handling posting Answers
 * @name router:/:questinId/answer
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} postAnswer - Express path
 * @returns Response Object
 */

router.post(
  "/questions/:questionId/answer",
  auth,
  createValidationFor("answer"),
  checkValidationResult,
  postAnswer
);

/**
 * Resource handling voting a question
 * @name router:/question/vote
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} voteQuestion - Express path
 * @returns Response Object
 */

router.post(
  "/questions/:questionId/vote",
  auth,
  createValidationFor("vote"),
  checkValidationResult,
  voteQuestion
);

export default router;
