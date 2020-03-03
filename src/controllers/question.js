import Question from "../models/Question";
import { responseHandler } from "../utils";

/**
 * @name askQuestion
 * @description This is the method for asking a question
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns an object of the details of question asked
 */

const askQuestion = async (req, res) => {
  try {
    const { body } = req.body;
    const question = new Question({ body });
    await question.save();
    if (question) {
      responseHandler(res, 201, {
        status: "success",
        message: "Question created successfully",
        data: question
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

/**
 * @name viewQuestions
 * @description This is the method for fetching all question
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns an object of all fetched questions
 */

const viewQuestions = async (req, res) => {
  try {
    const getQuestions = await Question.find().populate("answers");
    if (getQuestions) {
      responseHandler(res, 200, {
        status: "success",
        message: "Questions fetched successfully",
        data: getQuestions
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

const viewSingleQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const getQuestion = await Question.findById(questionId).populate("answers");
    if (getQuestion) {
      responseHandler(res, 200, {
        status: "success",
        message: "Question fetched successfully",
        data: getQuestion
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

export { askQuestion, viewQuestions, viewSingleQuestion };
