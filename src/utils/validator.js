import { check, validationResult } from "express-validator";
import { responseHandler } from "./index";

const createValidationFor = route => {
  switch (route) {
    case "signup":
      return [
        check("name", "Please Enter a Valid Name")
          .not()
          .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
          min: 7
        })
      ];
    case "login":
      return [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
          min: 7
        })
      ];
    case "question":
      return [
        check("body", "The question body should not be empty")
          .not()
          .isEmpty()
      ];
    case "answer":
      return [
        check("body", "The answer body should not be empty")
          .not()
          .isEmpty()
      ];
    default:
      return [];
  }
};
const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      errorMessage: error.msg
    };
  }
});

const checkValidationResult = (req, res, next) => {
  const result = myValidationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  responseHandler(res, 422, {
    status: "error",
    message: result.array()
  });
};

export { createValidationFor, checkValidationResult };
