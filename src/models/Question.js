const mongoose = require("mongoose");

/**
 * @name questionSchema
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns question model
 */

const questionSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true
    },
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    upvoterIds: { type: [String] },
    downvoterIds: { type: [String] },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }]
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
