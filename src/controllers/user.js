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
    const { email, password, name, subscribed } = req.body;
    const createUser = new User({ email, password, name, subscribed });
    await createUser.save();
    const token = await createUser.generateAuthToken();
    responseHandler(res, 201, {
      status: "success",
      message: "User successfully created!",
      data: { token }
    });
  } catch (err) {
    if (err.keyPattern.email) {
      responseHandler(res, 403, {
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

/**
 * @name loginUser
 * @description This is the method for login a user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns a token after success
 */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUser(email);
    if (!user) {
      return responseHandler(res, 404, {
        status: "error",
        message: [{ errorMessage: "User does not exist" }]
      });
    }
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return responseHandler(res, 403, {
        status: "error",
        message: [{ errorMessage: "Incorrect Password!" }]
      });
    }
    const token = await user.generateAuthToken();
    responseHandler(res, 200, {
      status: "success",
      message: "User Login successfully",
      data: { token }
    });
  } catch (error) {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please try again later" }]
    });
  }
};

export { createUser, loginUser };
