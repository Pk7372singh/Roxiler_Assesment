const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./config/db");
const transactionsRouter = require("./routes/transactions");
const statisticsRouter = require("./routes/statistics");
const barChartRouter = require("./routes/barchart");
const pieChartRouter = require("./routes/piechart");
const combinedRouter = require("./routes/combined");
const seedDatabase = require("./seedDatabase");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", transactionsRouter);
app.use("/api", statisticsRouter);
app.use("/api", barChartRouter);
app.use("/api", pieChartRouter);
app.use("/api", combinedRouter);

app.get("/", (req, res) => {
  res.send("health check");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT} and connected to DB`);
    seedDatabase;
  } catch (err) {
    console.log(err);
  }
});
