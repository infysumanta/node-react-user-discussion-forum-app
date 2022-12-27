const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(logger("common"));
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

module.exports = app;
