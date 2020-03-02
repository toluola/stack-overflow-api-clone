import User from "../models/User";
import { responseHandler } from "../utils";

/**
 * @name createUser
 * @description This is the method for creating a user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns a token after success
 */

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const createUser = new User({ email, password, name });
    await createUser.save();
    const token = await createUser.generateAuthToken();
    responseHandler(res, 201, {
      status: "success",
      message: "User successfully created!",
      data: token
    });
  } catch (err) {
    if (err.keyPattern.email) {
      responseHandler(res, 400, {
        status: "error",
        message: [
          { errorMessage: `The Email ${err.keyValue.email} already Exist` }
        ]
      });
    } else {
      responseHandler(res, 500, {
        status: "error",
        message: [{ errorMessage: "Server Error. Please Try Again" }]
      });
    }
  }
};

export { createUser };
