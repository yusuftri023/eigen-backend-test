import { CronJob } from "cron";

const job = new CronJob.from({
  cronTime: "* * * * * *",
  onTick: () => {
    console.log("cron job executed");
  },
  start: true,
  timeZone: "Asia/Jakarta",
});
