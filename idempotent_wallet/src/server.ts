import app from "./app";
import sequelize from "./config/db";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

startServer();
