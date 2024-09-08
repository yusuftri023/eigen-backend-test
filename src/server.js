import "dotenv/config";
import express from "express";
import router from "./interfaces/routes/index.js";
import cors from "cors";
import swagger from "swagger-ui-express";
import swaggerDocument from "../eigen-swagger.json" assert { type: "json" };
const app = express();
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Welcome to Backend Test");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Running at http://127.0.0.1:${process.env.SERVER_PORT}`);
});
