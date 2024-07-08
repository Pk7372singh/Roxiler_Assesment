// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// router.get("/piechart/:month", async (req, res) => {
//   const { month } = req.params;

//   if (!month) {
//     return res.status(400).json({ message: "Month parameter is required" });
//   }

//   const dateRegex = new RegExp(`-${month.padStart(2, "0")}-`);
//   console.log(dateRegex);

//   try {
//     const categories = await Product.aggregate([
//       { $match: { dateOfSale: { $regex: dateRegex } } },
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//     ]);

//     res.json(categories.map(({ _id, count }) => ({ category: _id, count })));
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching pie chart data", error });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/piechart/:month", async (req, res) => {
  const { month } = req.params;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ message: "Invalid month parameter" });
  }

  try {
    const categories = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(categories.map(({ _id, count }) => ({ category: _id, count })));
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error });
  }
});

module.exports = router;
