import express from "express";
import interestRouter from "./routes/interest.routes";

const app = express();
app.use(express.json());
app.use("/api/v1/interest", interestRouter);

export default app;
