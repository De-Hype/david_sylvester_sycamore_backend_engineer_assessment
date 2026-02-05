import { Model, DataTypes, Sequelize } from "sequelize";

export class Wallet extends Model {
  declare id: string;
  declare balance: string;

  static initModel(sequelize: Sequelize) {
    Wallet.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        balance: {
          type: DataTypes.DECIMAL(20, 6),
          allowNull: false,
          defaultValue: "0",
        },
      },
      {
        sequelize,
        tableName: "wallets",
      },
    );
  }
}
