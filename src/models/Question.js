const mongoose = require("mongoose");

/**
 * @name questionSchema
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns question model
 */

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    body: {
      type: String,
      required: true
    },
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    upvoterIds: { type: [String] },
    downvoterIds: { type: [String] },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);

Question.ensureIndexes(function(err) {
  if (err) console.log(err);
  else console.log("create question index successfully");
});

module.exports = Question;
