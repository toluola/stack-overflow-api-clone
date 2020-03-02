import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
