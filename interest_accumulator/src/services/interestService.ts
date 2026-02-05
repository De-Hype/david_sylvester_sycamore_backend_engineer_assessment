import Decimal from "decimal.js";
import { Account } from "../models/account.model";
import sequelize from "../config/db";

const ANNUAL_RATE = new Decimal(0.275); 

/**
 * Calculates the number of full days between two dates
 */
function daysBetween(date1: Date, date2: Date): number {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((d2.getTime() - d1.getTime()) / msPerDay);
}


export async function applyDailyInterest(accountId: string) {
  return await sequelize.transaction(async (t) => {
    const account = await Account.findByPk(accountId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!account) throw new Error("Account not found");

    const lastDate = new Date(account.lastInterestApplied);
    const today = new Date();
    const days = daysBetween(lastDate, today);

    if (days <= 0) return account; 

    const dailyRate = ANNUAL_RATE.dividedBy(365); 
    let balance = new Decimal(account.balance);

    for (let i = 0; i < days; i++) {
      balance = balance.plus(balance.mul(dailyRate));
    }

    account.balance = balance.toFixed(10);
    account.lastInterestApplied = today;
    await account.save({ transaction: t });

    return account;
  });
}
