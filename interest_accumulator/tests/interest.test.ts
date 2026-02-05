import { Account, sequelize } from "../src/models";
import { applyDailyInterest } from "../src/services/interestService";
import Decimal from "decimal.js";

jest.setTimeout(20000);

beforeAll(async () => await sequelize.sync({ force: true }));
afterAll(async () => await sequelize.close());

test("applies daily interest correctly over multiple days", async () => {
  const account = await Account.create({
    balance: "1000.0",
    lastInterestApplied: "2026-02-01",
  });

  // Simulate 4 days later
  const future = new Date("2026-02-05");
  jest.useFakeTimers().setSystemTime(future);

  const updated = await applyDailyInterest(account.id);

  const dailyRate = new Decimal(0.275).dividedBy(365);
  let expected = new Decimal("1000.0");
  for (let i = 0; i < 4; i++) expected = expected.plus(expected.mul(dailyRate));

  expect(updated.balance).toBe(expected.toFixed(10));
});

test("applies interest correctly across a leap day", async () => {
  const account = await Account.create({
    balance: "2000.0",
    lastInterestApplied: "2024-02-28",
  });

  // Simulate March 1, 2024 (2024 is leap year)
  const future = new Date("2024-03-01");
  jest.useFakeTimers().setSystemTime(future);

  const updated = await applyDailyInterest(account.id);

  const dailyRate = new Decimal(0.275).dividedBy(365);
  let expected = new Decimal("2000.0");
  for (let i = 0; i < 2; i++) expected = expected.plus(expected.mul(dailyRate));

  expect(updated.balance).toBe(expected.toFixed(10));
});
