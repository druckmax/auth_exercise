import express, { json } from "express";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
