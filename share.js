const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------- SHARE REPORT ---------- */
router.post("/", auth, (req, res) => {
  const { report_id, email } = req.body;

  db.run(
    `INSERT INTO shared_reports (report_id, shared_with_email, permission)
     VALUES (?, ?, ?)`,
    [report_id, email, "read"],
    () => {
      res.json({ msg: "Report shared successfully" });
    }
  );
});

/* ---------- VIEW SHARED REPORTS ---------- */
router.get("/", (req, res) => {
  const { email } = req.query;

  db.all(
    `SELECT reports.*
     FROM reports
     JOIN shared_reports
     ON reports.id = shared_reports.report_id
     WHERE shared_reports.shared_with_email = ?`,
    [email],
    (err, rows) => {
      res.json(rows);
    }
  );
});

module.exports = router;
