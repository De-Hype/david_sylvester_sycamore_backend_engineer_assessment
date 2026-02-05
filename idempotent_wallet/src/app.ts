import express from "express";
import transferRouter from "./routes/transfer.routes";

const app = express();
app.use(express.json());
app.use("/api/v1/transfer", transferRouter);

export default app;
