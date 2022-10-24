import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });
import app from "./app.js";

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful."))
  .catch((err) => console.error(err));

const port = process.env.PORT || 6969;
app.listen(port, () => console.log("Listening on port " + port));
