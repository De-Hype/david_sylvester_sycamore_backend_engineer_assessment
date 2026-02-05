import { Model, DataTypes, Sequelize } from "sequelize";

export class Account extends Model {
  declare id: string;
  declare balance: string;
  declare lastInterestApplied: Date;

  static initModel(sequelize: Sequelize) {
    Account.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        balance: {
          type: DataTypes.DECIMAL(30, 10),
          allowNull: false,
          defaultValue: "0.0",
        },
        lastInterestApplied: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: new Date(),
        },
      },
      { sequelize, tableName: "accounts" },
    );
  }
}
