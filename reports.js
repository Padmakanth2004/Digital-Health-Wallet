const express = require("express");
const multer = require("multer");
const db = require("../db/database");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------- FILE UPLOAD CONFIG ---------- */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

/* ---------- UPLOAD REPORT ---------- */
router.post("/", auth, upload.single("report"), (req, res) => {
  const { type, date, vitals } = req.body;
  const filePath = req.file.path;

  db.run(
    `INSERT INTO reports (user_id, type, date, vitals, file_path)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, type, date, vitals, filePath],
    function () {
      res.json({ msg: "Report uploaded successfully" });
    }
  );
});

/* ---------- GET ALL REPORTS ---------- */
router.get("/", auth, (req, res) => {
  db.all(
    "SELECT * FROM reports WHERE user_id = ?",
    [req.user.id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

/* ---------- FILTER REPORTS ---------- */
router.get("/filter", auth, (req, res) => {
  const { date, type } = req.query;

  let query = "SELECT * FROM reports WHERE user_id = ?";
  let params = [req.user.id];

  if (date) {
    query += " AND date = ?";
    params.push(date);
  }

  if (type) {
    query += " AND type = ?";
    params.push(type);
  }

  db.all(query, params, (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;
