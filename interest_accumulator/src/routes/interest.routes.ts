import express from "express";
import { applyDailyInterest } from "../services/interestService";

const router = express.Router();

router.post("/:accountId/apply-interest", async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await applyDailyInterest(accountId);
    res.json({ status: "ok", account });
  } catch (err: any) {
    res.status(500).json({ status: "fail", error: err.message });
  }
});

export default router;
