import jwt from "jsonwebtoken";
import User from "../models/User";
import { responseHandler } from "../utils";

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */

const auth = async (req, res, next) => {
  try {
    const checkToken = req.headers.authorization;
    if (!checkToken) {
      return responseHandler(res, 401, {
        status: "error",
        message: [{ errorMessage: "Token is missing" }]
      });
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({
      _id: data._id,
      "tokens.token": token
    }).select("-password");
    if (!user) {
      return responseHandler(res, 404, {
        status: "error",
        message: [{ errorMessage: "User does not exist" }]
      });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    responseHandler(res, 401, {
      status: "error",
      message: [{ errorMessage: "Not authorized to access this resource" }]
    });
  }
};

export default auth;
