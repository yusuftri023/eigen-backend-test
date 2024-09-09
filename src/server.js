import "dotenv/config";
import express from "express";
import router from "./interfaces/routes/index.js";
import cors from "cors";
import swagger from "swagger-ui-express";
import swaggerDocument from "../eigen-swagger.json" assert { type: "json" };
import { job } from "../utils/cron.js";
import { knexConnection } from "./infrastructures/database/config.js";

// check if member is late to return book, if yes, penalize the member
knexConnection
  .from("member_books")
  .select("*")
  .where({ returned_at: null })
  .then((data) => {
    data.forEach((item) => {
      if (new Date() - new Date(item.borrowed_at) > 7 * 24 * 60 * 60 * 1000) {
        knexConnection
          .from("member")
          .update({ is_penalized: true })
          .where({ member_code: item.member_code });
      }
    });
  });

knexConnection
  .from("member as m")
  .select("*")
  .where("m.is_penalized", true)
  .orderBy("m.code", "asc")
  .then((data) => {
    data.forEach(async (item) => {
      // select the latest time the book returned
      let [res] = await knexConnection
        .select("returned_at")
        .from("member_books")
        .where({ member_code: item.code })
        .orderBy("returned_at", "desc");

      if (
        res !== undefined &&
        new Date() - new Date(res.returned_at) > 3 * 24 * 60 * 60 * 1000
      ) {
        // update is_penalized to false if the latest time the book returned is more than 3 days
        knexConnection
          .from("member")
          .update({ is_penalized: false })
          .where({ code: item.code });
      }
    });
  });
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
job.start();
