const mongoose = require("mongoose");

/**
 * @name answerSchema
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns answer model
 */

const answerSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true
    },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
