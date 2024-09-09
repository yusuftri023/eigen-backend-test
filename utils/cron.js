import { CronJob } from "cron";
import { knexConnection } from "../src/infrastructures/database/config.js";
// executed every 24 hours at 23:59 Jakarta time
export const job = CronJob.from({
  cronTime: "59 59 */23 * * *",
  onTick: () => {
    console.log("cron job scheduler executed");
    // check if member is late to return book, if yes, penalize the member
    knexConnection
      .from("member_books")
      .select("*")
      .where({ returned_at: null })
      .then((data) => {
        data.forEach((item) => {
          if (
            new Date() - new Date(item.borrowed_at) >
            7 * 24 * 60 * 60 * 1000
          ) {
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
  },
  start: true,
  timeZone: "Asia/Jakarta",
});
