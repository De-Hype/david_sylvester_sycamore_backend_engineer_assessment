import request from "supertest";
import app from "../src/app";
import { TransactionLog, Wallet, sequelize } from "../src/models";

jest.setTimeout(20000); 

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /transfer", () => {
  let walletId: string;

  beforeEach(async () => {
    const wallet = await Wallet.create({ balance: "1000.00" });
    walletId = wallet.id;
  });

  afterEach(async () => {
    await TransactionLog.destroy({ where: {}, truncate: true, cascade: true });
    await Wallet.destroy({ where: {}, truncate: true, cascade: true });
  });

  it("should transfer funds and mark transaction COMPLETED", async () => {
    const response = await request(app).post("/api/v1/transfer").send({
      walletId,
      amount: "200",
      idempotencyKey: "abc-123",
    });

    expect(response.status).toBe(200);
    expect(response.body.txn.status).toBe("COMPLETED");

    const wallet = await Wallet.findByPk(walletId);
    expect(wallet!.balance).toBe("800.000000"); 
  });

  it("should prevent double-spending with same idempotency key", async () => {
    const _first = await request(app)
      .post("/api/v1/transfer")
      .send({ walletId, amount: "200", idempotencyKey: "abc-123" });

    const second = await request(app)
      .post("/api/v1/transfer")
      .send({ walletId, amount: "200", idempotencyKey: "abc-123" });

    expect(second.status).toBe(200);
    expect(second.body.txn.status).toBe("COMPLETED");

    const wallet = await Wallet.findByPk(walletId);
    expect(wallet!.balance).toBe("800.000000"); // no double debit
  });

  it("should throw error if insufficient funds", async () => {
    const response = await request(app)
      .post("/api/v1/transfer")
      .send({ walletId, amount: "2000", idempotencyKey: "key-456" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Insufficient balance");
  });
});
