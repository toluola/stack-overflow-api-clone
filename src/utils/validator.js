import { check, validationResult } from "express-validator";

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

    default:
      return [];
  }
};
const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      message: error.msg
    };
  }
});

const checkValidationResult = (req, res, next) => {
  const result = myValidationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(422).json({ errors: result.array() });
};

export { createValidationFor, checkValidationResult };
