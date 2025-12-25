const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/vitals", require("./routes/vitals"));
app.use("/api/share", require("./routes/share"));


app.listen(5000, () => console.log("Backend running on 5000"));
