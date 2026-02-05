import sequelize from "../config/db";
import { Wallet } from "./wallet.model";
import { TransactionLog } from "./transactionLog.model";

Wallet.initModel(sequelize);
TransactionLog.initModel(sequelize);

export { sequelize, Wallet, TransactionLog };
export default sequelize;
