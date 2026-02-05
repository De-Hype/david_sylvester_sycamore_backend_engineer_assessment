import express from "express";
import { transferFunds } from "../services/wallet.service";

const router = express.Router();

router.post("/", async (req, res) => {
  const { walletId, amount, idempotencyKey } = req.body;

  if (!walletId || !amount || !idempotencyKey)
    return res.status(400).json({
      status: "fail",
      error: "Missing fields for either walletId, amount, or idempotencyKey",
    });

  try {
    const txn = await transferFunds(walletId, amount, idempotencyKey);
    res.json({ status: "ok", txn });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
