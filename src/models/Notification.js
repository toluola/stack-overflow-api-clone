const mongoose = require("mongoose");

/**
 * @name notificationSchema
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns answer model
 */

const notificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answerId: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
    status: {
      type: String,
      enum: ["read", "unread"],
      default: "unread"
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
