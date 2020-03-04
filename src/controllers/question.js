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
    const { body, title } = req.body;
    const { _id: userId } = req.user;
    const question = new Question({ body, title, userId });
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

const voteQuestion = async (req, res) => {
  const { voteType } = req.body;
  const { questionId } = req.params;
  const { _id: userId } = req.user;
  const findQuestion = await Question.findById(questionId);
  const upvoteInitialLength = findQuestion.upvoterIds.length;
  const downvoteInitialLength = findQuestion.downvoterIds.length;

  if (voteType === "up") {
    await Question.updateOne(
      { _id: questionId },
      {
        $addToSet: {
          upvoterIds: userId
        }
      }
    );
    const findQuestionStatus = await Question.findById(questionId);
    if (findQuestionStatus.upvoterIds.length === upvoteInitialLength) {
      await Question.updateOne(
        { _id: questionId },
        {
          $pull: {
            upvoterIds: userId
          }
        }
      );
      await Question.updateOne(
        { _id: questionId },
        {
          $inc: {
            upvoteCount: -1
          }
        }
      );
      responseHandler(res, 200, {
        status: "success",
        message: "Upvote Successfully removed"
      });
    } else {
      await Question.updateOne(
        { _id: questionId },
        {
          $addToSet: {
            upvoterIds: userId
          }
        }
      );

      await Question.updateOne(
        { _id: questionId },
        {
          $inc: {
            upvoteCount: 1
          }
        }
      );
      responseHandler(res, 200, {
        status: "success",
        message: "Upvote Successfull"
      });
    }
  }

  if (voteType === "down") {
    await Question.updateOne(
      { _id: questionId },
      {
        $addToSet: {
          downvoterIds: userId
        }
      }
    );
    const findQuestionStatus = await Question.findById(questionId);
    if (findQuestionStatus.downvoterIds.length === downvoteInitialLength) {
      await Question.updateOne(
        { _id: questionId },
        {
          $pull: {
            downvoterIds: userId
          }
        }
      );
      await Question.updateOne(
        { _id: questionId },
        {
          $inc: {
            downvoteCount: -1
          }
        }
      );
      responseHandler(res, 200, {
        status: "success",
        message: "Downvote Successfully removed"
      });
    } else {
      await Question.updateOne(
        { _id: questionId },
        {
          $addToSet: {
            downvoterIds: userId
          }
        }
      );

      await Question.updateOne(
        { _id: questionId },
        {
          $inc: {
            downvoteCount: 1
          }
        }
      );
      responseHandler(res, 200, {
        status: "success",
        message: "Downvote Successfull"
      });
    }
  }
};

export { askQuestion, viewQuestions, viewSingleQuestion, voteQuestion };
