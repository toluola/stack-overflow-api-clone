import { io } from "../utils/notificationSetup";

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
