import Question from "../models/Question";
import Answer from "../models/Answer";
import User from "../models/User";
import { responseHandler } from "../utils";

const searchAll = async (req, res) => {
  try {
    if (req.query.question) {
      const { question } = req.query;
      const searchQuestion = await Question.find({
        title: {
          $regex: new RegExp(question),
          $options: "i"
        }
      });
      if (searchQuestion.length > 0) {
        return responseHandler(res, 200, {
          status: "success",
          message: "Question Successfully Searched",
          data: searchQuestion
        });
      }

      responseHandler(res, 404, {
        status: "success",
        message: "No Question Found"
      });
    }

    if (req.query.answer) {
      const { answer } = req.query;
      const searchAnswer = await Answer.find({
        body: {
          $regex: new RegExp(answer),
          $options: "i"
        }
      });
      if (searchAnswer.length > 0) {
        return responseHandler(res, 200, {
          status: "success",
          message: "Answer Successfully Searched",
          data: searchAnswer
        });
      }

      responseHandler(res, 404, {
        status: "success",
        message: "No Answer Found"
      });
    }

    if (req.query.name) {
      const { name } = req.query;
      const searchProfile = await User.find({
        name: {
          $regex: new RegExp(name),
          $options: "i"
        }
      }).select("-password");
      if (searchProfile.length > 0) {
        return responseHandler(res, 200, {
          status: "success",
          message: "Profile Successfully Searched",
          data: searchProfile
        });
      }
      responseHandler(res, 404, {
        status: "success",
        message: "No Profile Found"
      });
    }
  } catch {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

export { searchAll };
