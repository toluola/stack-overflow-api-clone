import { io } from "../utils/notificationSetup";
import Notification from "../models/Notification";

/**
 * @name clearNotifications
 * @description This is the method for clearing notifications
 * @param {object|array} payload Should contain an object
 * @param {string} socketId ID of the socket
 * @returns {boolean} Returns boolean.
 */
export const clearNotifications = async (payload, socketId) =>
  console.log(payload, socketId);

/**
 * @name notify
 * @description This is the method for emmiting events/notifications
 * @param {object|void} param Should contain an object
 * @param {string} eventName Title of the event
 * @returns {function} Emits a notification to the selected collection
 */
export const notify = async (id, eventName, payload) => {
  try {
    await io.to(id).emit(eventName, payload);
  } catch (err) {
    consle.log(err);
  }
};

export const saveNotifications = async (payload, meta) => {
  try {
    const { userId, _id: answerId, questionId } = payload;
    const { message } = meta;
    const notification = await new Notification({
      userId,
      questionId,
      message,
      answerId
    });
  } catch (error) {
    throw new Error("Notification save failed.");
  }
};
