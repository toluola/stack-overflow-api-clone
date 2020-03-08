import "@babel/polyfill";
import Question from "../models/Question";

/**
 * @name responseFormat
 * @description This is a response handler
 * @param {object} res The response object
 * @param {object} code Valid HTTP code
 * @param {object} payload The response data to the user
 * @returns {object} Returns the response object
 */
export const responseHandler = (res, code, payload) =>
  res.status(code).json({
    ...payload
  });

/**
 * @name addToSetQuestion
 * @description This is a response handler
 * @param {object} res The response object
 * @param {object} code Valid HTTP code
 * @param {object} payload The response data to the user
 * @returns {object} Returns the response object
 */

export const addToSetQuestion = async (questionId, userId, type) => {
  if (type === "up") {
    await Question.updateOne(
      { _id: questionId },
      {
        $addToSet: {
          upvoterIds: userId
        }
      }
    );
  } else {
    await Question.updateOne(
      { _id: questionId },
      {
        $addToSet: {
          downvoterIds: userId
        }
      }
    );
  }
};

/**
 * @name pullQuestion
 * @description This is a response handler
 * @param {object} res The response object
 * @param {object} code Valid HTTP code
 * @param {object} payload The response data to the user
 * @returns {object} Returns the response object
 */

export const pullQuestion = async (questionId, userId, type) => {
  if (type === "up") {
    await Question.updateOne(
      { _id: questionId },
      {
        $pull: {
          upvoterIds: userId
        }
      }
    );
  } else {
    await Question.updateOne(
      { _id: questionId },
      {
        $pull: {
          downvoterIds: userId
        }
      }
    );
  }
};

/**
 * @name vote
 * @description This is a response handler
 * @param {object} res The response object
 * @param {object} code Valid HTTP code
 * @param {object} payload The response data to the user
 * @returns {object} Returns the response object
 */

export const vote = async (questionId, count, type) => {
  if (type === "up") {
    await await Question.updateOne(
      { _id: questionId },
      {
        $inc: {
          upvoteCount: count
        }
      }
    );
  } else {
    await Question.updateOne(
      { _id: questionId },
      {
        $inc: {
          downvoteCount: count
        }
      }
    );
  }
};
