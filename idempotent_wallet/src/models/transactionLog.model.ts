import { Model, DataTypes, Sequelize } from "sequelize";

export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED";

export class TransactionLog extends Model {
  declare id: string;
  declare walletId: string;
  declare amount: string;
  declare idempotencyKey: string;
  declare status: TransactionStatus;

  static initModel(sequelize: Sequelize) {
    TransactionLog.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        walletId: { type: DataTypes.UUID, allowNull: false },
        amount: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
        idempotencyKey: { type: DataTypes.STRING, allowNull: false },
        status: {
          type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
          allowNull: false,
          defaultValue: "PENDING",
        },
      },
      {
        sequelize,
        tableName: "transaction_logs",
      },
    );
  }
}
