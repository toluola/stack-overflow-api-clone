import Socket from "socket.io";
import engine from "engine.io";
import { clearNotifications } from "./notifyUser";

import { verifyToken } from "./verifyToken";

const io = new Socket();

const options = {
  path: "/api/v1/notifications"
};

engine.Server.prototype.generateId = req => {
  try {
    const query = "_query";
    const token = verifyToken(req[query].authorization.replace("Bearer ", ""))
      .id;
    return token;
  } catch (error) {
    return false;
  }
};

io.use((socket, next) => {
  if (!socket.id) {
    return next(new Error("Not authorized"));
  }
  next();
});

io.on("connection", socket => {
  const { id: socketId } = socket;
  socket.on("clear-notifications", async payload =>
    clearNotifications(payload, socketId)
  );
});

export { io, options };
