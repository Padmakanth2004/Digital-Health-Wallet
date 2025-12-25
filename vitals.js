const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------- ADD VITALS ---------- */
router.post("/", auth, (req, res) => {
  const { bp, sugar, heart_rate, date } = req.body;

  db.run(
    `INSERT INTO vitals (user_id, bp, sugar, heart_rate, date)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, bp, sugar, heart_rate, date],
    () => {
      res.json({ msg: "Vitals added successfully" });
    }
  );
});

/* ---------- GET VITALS (DATE RANGE) ---------- */
router.get("/", auth, (req, res) => {
  const { from, to } = req.query;

  let query = "SELECT * FROM vitals WHERE user_id = ?";
  let params = [req.user.id];

  if (from && to) {
    query += " AND date BETWEEN ? AND ?";
    params.push(from, to);
  }

  db.all(query, params, (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;
