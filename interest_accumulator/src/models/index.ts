import sequelize from "../config/db";

import { Account } from "./account.model";

Account.initModel(sequelize);

export { sequelize, Account };
export default sequelize;
