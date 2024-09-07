import "dotenv/config";
import express from "express";
import router from "./infrastructures/routes/index.js";
import cors from "cors";
const app = express();

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
