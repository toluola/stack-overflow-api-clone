import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import routers from "./routers";
import { io, options } from "./utils/notificationSetup";
import { swaggerDocument } from "./swagger";
import "./db/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const httpServer = http.createServer(app);
io.attach(httpServer, options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", routers);

httpServer.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
