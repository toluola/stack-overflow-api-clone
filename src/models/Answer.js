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
      required: true,
      index: true
    },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model("Answer", answerSchema);

Answer.ensureIndexes(function(err) {
  if (err) console.log(err);
  else console.log("create question index successfully");
});

module.exports = Answer;
