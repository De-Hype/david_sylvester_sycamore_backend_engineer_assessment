import app from "./app";
import { sequelize } from "./models";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connected successfully");
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT} for interest_accumulator app`));
  } catch (err) {
    console.error("DB connection failed", err);
  }
}

start();
