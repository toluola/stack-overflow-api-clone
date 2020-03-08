import Answer from "../models/Answer";
import Question from "../models/Question";
import User from "../models/User";
import { responseHandler } from "../utils";
import { notify, saveNotifications } from "../utils/notifyUser";

/**
 * @name postAnswer
 * @description This is the method for posting an answer
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns an object of the posted answer
 */

const postAnswer = async (req, res) => {
  try {
    const { body } = req.body;
    const { questionId } = req.params;
    const { _id: userId, name } = req.user;
    const answer = new Answer({ body, questionId, userId });
    await answer.save();
    const getQuestion = await Question.findById(questionId);
    getQuestion.answers.push(answer);
    await getQuestion.save();
    const getUser = await User.findById(getQuestion.userId);
    if (getUser.subscribed === true) {
      await notify(getUser._id, "question-answered", answer);
    }

    responseHandler(res, 201, {
      status: "success",
      message: "Answer posted successfully",
      data: answer
    });
  } catch (err) {
    responseHandler(res, 500, {
      status: "error",
      message: [{ errorMessage: "Server Error. Please Try Again" }]
    });
  }
};

export { postAnswer };
