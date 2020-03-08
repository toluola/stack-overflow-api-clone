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

export const formatResponse = response => {
  response.map(response => {
    response._id;
    response.body;
    response.voteCount;
  });
};
