import sequelize from "../config/db";
import Decimal from "decimal.js";
import { TransactionLog } from "../models/transactionLog.model";
import { Wallet } from "../models/wallet.model";

export async function transferFunds(
  walletId: string,
  amount: string,
  idempotencyKey: string,
) {
  return await sequelize.transaction(async (t) => {
    const existing = await TransactionLog.findOne({
      where: { idempotencyKey },
      transaction: t,
    });
    if (existing) return existing;

    const txn = await TransactionLog.create(
      { walletId, amount, idempotencyKey, status: "PENDING" },
      { transaction: t },
    );

    const wallet = await Wallet.findByPk(walletId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!wallet) throw new Error("Wallet not found");

    const balance = new Decimal(wallet.balance);
    const amt = new Decimal(amount);

    if (balance.lessThan(amt)) throw new Error("Insufficient balance");

    wallet.balance = balance.minus(amt).toFixed(6);
    await wallet.save({ transaction: t });

    txn.status = "COMPLETED";
    await txn.save({ transaction: t });

    return txn;
  });
}
