import "reflect-metadata";
import express from "express";
import cors from "cors";

import "./database/connect";
import routes from "./router";

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log("Server: http://localhost:3000"));
