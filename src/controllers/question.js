import Question from "../models/Question";
import {
  responseHandler,
  addToSetQuestion,
  pullQuestion,
  vote
} from "../utils";

/**
 * @name askQuestion
 * @description This is the method for asking a question
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns an object of the details of question asked
 */

const askQuestion = async (req, res) => {
  try {
    const { body: reqBody, title: reqTitle } = req.body;
    const { _id: userId } = req.user;
    const question = new Question({ body: reqBody, title: reqTitle, userId });
    await question.save();
    const { _id, body, title, userId: authorId, createdAt } = question;
    if (question) {
      responseHandler(res, 201, {
        status: "success",
        message: "Question created successfully",
        data: {
          _id,
          body,
          title,
          authorId,
          createdAt
        }
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
    if (getQuestions.length > 0) {
      return responseHandler(res, 200, {
        status: "success",
        message: "Questions fetched successfully",
        data: getQuestions
      });
    }
    responseHandler(res, 404, {
      status: "error",
      message: [
        {
          errorMessage:
            "There are no questions in the database. You can ask a question."
        }
      ]
    });
  } catch (err) {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

/**
 * @name viewSingleQuestion
 * @description This is the method for fetching a single question
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns an object of a fetched question
 */

const viewSingleQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const getQuestion = await Question.findById(questionId).populate("answers");
    const {
      _id,
      body,
      title,
      userId: authorId,
      answers,
      upvoteCount,
      downvoteCount,
      createdAt
    } = getQuestion;
    responseHandler(res, 200, {
      status: "success",
      message: "Question fetched successfully",
      data: {
        _id,
        body,
        title,
        userId: authorId,
        upvoteCount,
        downvoteCount,
        answers,
        createdAt
      }
    });
  } catch (err) {
    responseHandler(res, 404, {
      status: "error",
      message: [{ errorMessage: "No question found" }]
    });
  }
};

/**
 * @name voteQuestions
 * @description This is the method for voting on a question
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns status of the vote on the question
 */

const voteQuestion = async (req, res) => {
  const { voteType } = req.body;
  const { questionId } = req.params;
  const { _id: userId } = req.user;
  const findQuestion = await Question.findById(questionId);
  const upvoteInitialLength = findQuestion.upvoterIds.length;
  const downvoteInitialLength = findQuestion.downvoterIds.length;
  try {
    if (voteType === "up") {
      await addToSetQuestion(questionId, userId, "up");
      const findQuestionStatus = await Question.findById(questionId);
      if (findQuestionStatus.upvoterIds.length === upvoteInitialLength) {
        await pullQuestion(questionId, userId, "up");
        await vote(questionId, -1, "up");
        responseHandler(res, 200, {
          status: "success",
          message: "Upvote Successfully removed"
        });
      } else {
        await addToSetQuestion(questionId, userId, "up");
        await vote(questionId, 1, "up");

        responseHandler(res, 200, {
          status: "success",
          message: "Upvote Successfull"
        });
      }
    }

    if (voteType === "down") {
      await addToSetQuestion(questionId, userId, "down");

      const findQuestionStatus = await Question.findById(questionId);
      if (findQuestionStatus.downvoterIds.length === downvoteInitialLength) {
        await pullQuestion(questionId, userId, "down");
        await vote(questionId, -1, "down");

        responseHandler(res, 200, {
          status: "success",
          message: "Downvote Successfully removed"
        });
      } else {
        await addToSetQuestion(questionId, userId, "down");
        await vote(questionId, 1, "down");

        responseHandler(res, 200, {
          status: "success",
          message: "Downvote Successfull"
        });
      }
    }
  } catch {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

export { askQuestion, viewQuestions, viewSingleQuestion, voteQuestion };
