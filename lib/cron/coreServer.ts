import { startExpirationCron } from "./expireDonations";
import dbConnect from "@/DB/connection";

export async function initServer() {
  await dbConnect();
  // Start cron job
  startExpirationCron();
  console.log("Expiration cron started");
}
